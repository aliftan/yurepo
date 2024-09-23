import * as esprima from 'esprima';

interface FunctionCall {
    name: string;
    params: number;
}

interface FunctionInfo {
    file: string;
    calls: FunctionCall[];
}

export function parseJavascript(content: string, fileName: string): Record<string, FunctionInfo> {
    const parsed = esprima.parseModule(content, { range: true, comment: true });
    const functions: Record<string, FunctionInfo> = {};

    function extractFunctionCalls(node: esprima.Node): FunctionCall[] {
        const calls: FunctionCall[] = [];
        if (node.type === 'CallExpression' && node.callee.type === 'Identifier') {
            calls.push({
                name: node.callee.name,
                params: node.arguments.length
            });
        }
        for (const key in node) {
            if (node[key] && typeof node[key] === 'object') {
                calls.push(...extractFunctionCalls(node[key] as esprima.Node));
            }
        }
        return calls;
    }

    parsed.body.forEach(node => {
        if (node.type === 'FunctionDeclaration' && node.id) {
            functions[node.id.name] = {
                file: fileName,
                calls: extractFunctionCalls(node.body)
            };
        } else if (node.type === 'VariableDeclaration') {
            node.declarations.forEach(declarator => {
                if (declarator.init && declarator.init.type === 'FunctionExpression' && declarator.id && declarator.id.type === 'Identifier') {
                    functions[declarator.id.name] = {
                        file: fileName,
                        calls: extractFunctionCalls(declarator.init.body)
                    };
                }
            });
        }
    });

    return functions;
}
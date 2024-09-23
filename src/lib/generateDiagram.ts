interface FunctionCall {
    name: string;
    params: number;
}

interface FunctionInfo {
    file: string;
    calls: FunctionCall[];
}

export function generateDiagram(functions: Record<string, FunctionInfo>): string {
    let mermaidSyntax = "graph TD\n";

    // Group functions by file
    const files: Record<string, string[]> = {};
    Object.entries(functions).forEach(([func, data]) => {
        if (!files[data.file]) {
            files[data.file] = [];
        }
        files[data.file].push(func);
    });

    // Create subgraphs for each file
    Object.entries(files).forEach(([file, funcs]) => {
        mermaidSyntax += `    subgraph ${file}\n`;
        funcs.forEach(func => {
            mermaidSyntax += `    ${func}[${func}]\n`;
        });
        mermaidSyntax += "    end\n\n";
    });

    // Add function call relationships
    Object.entries(functions).forEach(([func, data]) => {
        data.calls.forEach(call => {
            mermaidSyntax += `    ${func} -->|calls with ${call.params} params| ${call.name}\n`;
        });
    });

    return mermaidSyntax;
}
import { NextRequest, NextResponse } from 'next/server';
import { parseJavascript } from '../../../lib/parseJavascript';
import { generateDiagram } from '../../../lib/generateDiagram';

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    const allFunctions: Record<string, any> = {};

    for (const file of files) {
        const content = await file.text();
        const functions = parseJavascript(content, file.name);
        Object.assign(allFunctions, functions);
    }

    const diagramData = generateDiagram(allFunctions);

    return NextResponse.json({ diagramData });
}
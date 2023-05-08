import { connectToDatabase } from "@utils/database";
import Prompt from "@models/Prompt";

// GET (read)
export const GET = async (request ,{params}) => {
    try {
        await connectToDatabase();

        const prompt = await Prompt.findById(params.id).populate("creator");

        if (!prompt) return new Response("Prompt not found!", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response("Failed To Fetch Data From Server", { status: 500 });
    };
};

// PATCH (update)
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDatabase();
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt Not Found!", { status: 404 });
        }
        
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        
        await existingPrompt.save();

        return new Response("Successfully update the prompt", { status: 200 });

    } catch (error) {
        return new Response("Failed to update prompt", { status: 500 });
    }
};

// DELETE (delete)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDatabase();

        await Prompt.findByIdAndRemove(params.id);
        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete prompt", { status: 500 });
    };
}; 
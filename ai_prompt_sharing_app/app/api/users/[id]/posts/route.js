import { connectToDatabase } from "@utils/database";
import Prompt from "@models/Prompt";

export const GET = async (request, { params }) => {
    try {
        await connectToDatabase();

        const prompts = await Prompt.find({
            creator: params.id
        }).populate("creator");

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response("Failed To Fetch Data From Server", { status: 500 });
    };
};
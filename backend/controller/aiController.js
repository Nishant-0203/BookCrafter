const { GoogleGenAI } = require("@google/genai");

const ai=new GoogleGenAI({
    apiKey:process.env.GOOGLE_AI_API_KEY
});

//@desc Generate a book outline
//@route POST /api/ai/generate-outline
const generateBookOutline=async(req,res)=>{
    try{
        const{topic,style,numChapters,description}=req.body;
        if(!topic){
            return res.status(400).json({message:"Topic is required"});
        }
        const prompt = `You are an expert book outline generator. Create a comprehensive book outline based on the following requirements:
Topic: "${topic}"
${description ? `Description: ${description}` : ""}
Writing Style: ${style}
Number of Chapters: ${numChapters || 5}



 R equirements:
1. Generate exactly ${numChapters || 5} chapters
2. Each chapter title should be clear, engaging, and follow a logical progression
3. Each chapter description should be 2-3 sentences explaining what the chapter covers
4. Ensure chapters build upon each other coherently
5. Match the "${style}" writing style in your titles and descriptions

Output Format:
Return ONLY a valid JSON array with no additional text, markdown, or formatting. Each object must have exactly two keys: "title" and "description".

Example structure:
[
{
  "title": "Chapter 1: Introduction to the Topic",
  "description": "A comprehensive overview introducing the main concepts. Sets the foundation for understanding the subject matter."
},
{
  "title": "Chapter 2: Core Principles",
  "description": "Explores the fundamental principles and theories. Provides detailed examples and real-world applications."
}
]
Generate the outline now.`;

        const response=await ai.models.generateContent({
            model:"gemini-2.5-flash-lite",
            contents: prompt,
        });
        const text =response.text;
        //find and extract the json array from the response text
        const startIndex =text.indexOf('[');
        const endIndex =text.lastIndexOf(']');
        if(startIndex===-1 || endIndex===-1){
            console.error({message:"Failed to parse AI response", text});
            return res.status(500).json({message:"Failed to parse AI response"});
        }
        const jsonString =text.substring(startIndex,endIndex+1);
        //validate if the response is a valid json
        try{
            const outline=JSON.parse(jsonString);
            return res.status(200).json({outline});
        }
        catch(e){
            console.error({message:"Invalid JSON from AI",jsonString});
            return res.status(500).json({message:"Invalid JSON from AI"});
        }
    }
        catch(error){
            console.error("Generate outline error:",error);
            res.status(500).json({message: "Server error during AI outline generation"});
        }
    };

//@desc Generate content for a chapter
//@route POST /api/ai/generate-chapter
// @access Private
const generateChapterContent=async(req,res)=>{
    try{
        }
        catch(error){
            console.error("Generate chapter content error:",error);
            res.status(500).json({message: "Server error during AI chapter content generation"});
        }
    };
module.exports={generateBookOutline,generateChapterContent};

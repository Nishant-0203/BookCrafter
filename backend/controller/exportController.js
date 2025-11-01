const {
Document,
Packer,
Paragraph,
TextRun,
HeadingLevel,
AlignmentType,
UnderlineType,
ImageRun,
} = require("docx");

const PDFDocument =require("pdfikit");
const MarkdownIt =require("markdown-it");
const Book =require("../models/Book");
const path = require("path");
const fs = require("fs");
const md = new MarkdownIt();
// Typography configuration matching the POF export
const DOCX_STYLES = {
  fonts: {
    body: "Charter",
    heading: "Inter",
  },
  sizes: {
    title: 32,
    subtitle: 20,
    author: 18,
    chapterTitle: 24,
    h1: 20,
    h2: 18,
    h3: 16,
    body: 12,
  },
  spacing:{
    paragraphBefore: 200,
    paragraphAfter: 200,
    chapterBefore: 400,
    chapterAfter: 400,
    headingBefore: 300,
    headingAfter: 150,
  },
};

const exportAsDocument =async (req, res) => {
    try {
        const book=await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if(book.userId.toString() !== req.user.id){
            return res.status(403).json({ message: "Unauthorized access to this book" });
        }

        const sections=[];

        const coverPage=[];
        if(book.coverImage && !book.coverImage.includes("pravata")){
            const imagePath=book.coverImage.substring(1);
            try{
                if(fs.existsSync(imagePath)){
                    const imageBuffer=fs.readFileSync(imagePath);
                    coverPage.push(
                        new Paragraph({
                            text: "",
                            spacing: {before: 1000},
                        })
                    );

                    coverPage.push(
                        new Paragraph({
                            children: [
                                new ImageRun({
                                    data: imageBuffer,
                                    transformation: {
                                        width: 400,
                                        height: 550,
                                    },
                                }),
                            ],
                            alignment: AlignmentType.CENTER,
                            spacing: {before: 200, after: 400},
                        })
                    );
                    
                    coverPage.push(
                        new Paragraph({
                            text: "",
                            pageBreakBefore: true,
                        })
                    );
                }
            }
            catch (imgErr){
                console.error(`Error reading cover image: ${imagePath}`, imgErr);
            }
        }
        sections.push(...coverPage);
        // Main tatile
titlePage.push(
  new Paragraph({
    children: [
      new TextRun({
        text: book.title,
        bold: true,
        font: DOCX_STYLES.fonts.heading,
        size: DOCX_STYLES.sizes.title * 2,
        color: "1A202C",
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 2000, after: 400 },
  })
);

// Subtitle (if it exists)
if (book.subtitle && book.subtitle.trim()) {
  titlePage.push(
    new Paragraph({
      children: [
        new TextRun({
          text: book.subtitle,
          font: DOCX_STYLES.fonts.subheading,
          size: DOCX_STYLES.sizes.subtitle * 2,
          color: "4A5568",
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    })
  );
}

// Author
titlePage.push(
  new Paragraph({
    children: [
      new TextRun({
        text: `by ${book.author}`,
        font: DOCX_STYLES.fonts.heading,
        size: DOCX_STYLES.sizes.author * 2,
        color: "2D3748",
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  })
);

// Decorative Line
titlePage.push(
  new Paragraph({
    border: {
      bottom: {
        color: "4F46E5",
        space: 1,
        style: "single",
        size: 12, // thickness of line
      },
    },
    alignment: AlignmentType.CENTER,
    spacing: { before: 400 },
  })
);
sections.push(...titlePage);
// Process chapters
book.chapters.forEach((chapter, index) => {
  try {
    // Add page break before each chapter except the first
    if (index > 0) {
      sections.push(
        new Paragraph({
            text: "",
          pageBreakBefore: true,
        })
      );
    }

    // Chapter title
    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: chapter.title,
            bold: true,
            font: DOCX_STYLES.fonts.heading,
            size: DOCX_STYLES.sizes.chapterTitle * 2,
            color: "1A202C",
          }),
        ],
        spacing:{
            before: DOCX_STYLES.spacing.chapterBefore,
            after: DOCX_STYLES.spacing.chapterAfter,
        }
      })
    );
    // Chapter content processing
    const contentParagraphs = processMarkdownToDocx(chapter.content || "");

    // Push all generated paragraphs into sections
    sections.push(...contentParagraphs);
  } catch (chapterError) {
    console.error(`Error processing chapter ${index}:`, chapterError);
  }
});

// Create the document
const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: 1440,    // 1 inch
            right: 1440,  // 1 inch
            bottom: 1440, // 1 inch
            left: 1440,   // 1 inch
          },
        },
      },
      children: sections,
    },
  ],
});

const buffer = await Packer.toBuffer(doc);

  // Set response headers
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${book.title.replace(/[^a-zA-Z0-9]/g, "_")}.docx"`
  );
  res.setHeader("Content-Length", buffer.length);

  // Send the document buffer
  res.send(buffer);
} catch (error) {
  console.error("Error exporting DOCX:", error);
  if(!res.headersSent){
    res.status(500).json({ message: "Server error during document export", error: error.message  });
  }
}
};
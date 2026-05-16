export interface ShotDefinition {
  id: number;
  slug: string;
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  icon: string;
  geminiPrompt: string;
  openaiPrompt: string;
  bgGradient: string;
}

export const SHOT_DEFINITIONS: ShotDefinition[] = [
  {
    id: 1,
    slug: "hero",
    title: "Hero Shot",
    titleVi: "Ảnh chính",
    description: "Front-facing on pure white background",
    descriptionVi: "Mặt trước, nền trắng tinh",
    icon: "⭐",
    geminiPrompt: `Take this product image and recreate it as a professional e-commerce hero shot.
Requirements:
- Pure white (#FFFFFF) seamless background
- Product centered, occupying 80-85% of frame
- Shot from directly in front (0 degree angle)
- Soft, even studio lighting from both sides, no harsh shadows
- Product perfectly sharp with clean edges
- Square 1:1 aspect ratio
- Color-accurate, photorealistic rendering
- No props, no text, no watermarks`,
    openaiPrompt: `Professional e-commerce hero shot of this product. Pure white seamless background, product centered front-facing at 0 degrees, even soft studio lighting, no shadows, square format, photorealistic, no text or watermarks.`,
    bgGradient: "from-blue-900/40 to-blue-800/20",
  },
  {
    id: 2,
    slug: "three-quarter",
    title: "3/4 Angle",
    titleVi: "Góc 3/4",
    description: "45° angle showing depth and form",
    descriptionVi: "45°, thấy chiều sâu và khối",
    icon: "🔲",
    geminiPrompt: `Recreate this product as a professional 3/4 perspective e-commerce photo.
Requirements:
- Pure white seamless background
- Product rotated 45 degrees to show front face, one side face, and top face simultaneously
- Soft studio lighting emphasizing 3D form
- Slight shadow under product for grounding (soft, not harsh)
- Square 1:1 aspect ratio
- Photorealistic, color-accurate
- No text, no watermarks`,
    openaiPrompt: `Product photo at 45-degree 3/4 angle, white background, showing front, side, and top of product simultaneously, soft studio lighting with subtle ground shadow, square format, photorealistic.`,
    bgGradient: "from-teal-900/40 to-teal-800/20",
  },
  {
    id: 3,
    slug: "side-profile",
    title: "Side Profile",
    titleVi: "Góc bên cạnh",
    description: "90° side view showing depth",
    descriptionVi: "90°, thấy độ dày thật sự",
    icon: "◧",
    geminiPrompt: `Recreate this product as a professional side profile e-commerce photo.
Requirements:
- Pure white seamless background
- Product shot from exact 90-degree side angle
- Reveals true depth, thickness, and side profile shape
- Even studio lighting, minimal shadows
- Square 1:1 aspect ratio, product centered
- Photorealistic rendering
- No text, no watermarks`,
    openaiPrompt: `Product side profile shot at 90 degrees, pure white background, showing true thickness and depth, even lighting, square format, photorealistic.`,
    bgGradient: "from-purple-900/40 to-purple-800/20",
  },
  {
    id: 4,
    slug: "detail-closeup",
    title: "Detail Close-up",
    titleVi: "Chi tiết zoom",
    description: "Macro shot of key selling feature",
    descriptionVi: "Zoom vào điểm bán hàng",
    icon: "🔍",
    geminiPrompt: `Recreate a professional macro detail close-up of this product's most important or distinctive feature.
Requirements:
- Extreme close-up of the most visually interesting or quality-indicating part (logo, texture, material, stitching, button, clasp, screen, etc.)
- Shallow depth of field with subject in sharp focus
- Clean neutral background (white or very light gray)
- Dramatic macro lighting to reveal texture and material quality
- Square 1:1 aspect ratio
- Photorealistic, high detail
- No text, no watermarks`,
    openaiPrompt: `Macro detail close-up of the most distinctive feature of this product, shallow depth of field, sharp focus on texture or logo or material, neutral background, dramatic lighting revealing quality, square format.`,
    bgGradient: "from-amber-900/40 to-amber-800/20",
  },
  {
    id: 5,
    slug: "lifestyle",
    title: "Lifestyle",
    titleVi: "Lifestyle / In-use",
    description: "Product in real-world context",
    descriptionVi: "Sản phẩm trong môi trường thực",
    icon: "🌿",
    geminiPrompt: `Recreate this product in a lifestyle/in-use photography style for e-commerce.
Requirements:
- Show the product being used or displayed in a realistic, aspirational real-world environment
- Choose an appropriate lifestyle context matching the product type
- Natural or warm lifestyle lighting (not studio flash)
- Include subtle, tasteful lifestyle props that complement the product
- Square 1:1 aspect ratio
- Warm, inviting color palette
- Photorealistic scene
- No text overlays, no watermarks`,
    openaiPrompt: `Lifestyle product photography showing this product in use in a realistic aspirational environment, natural warm lighting, tasteful complementary props, square format, warm inviting colors, photorealistic.`,
    bgGradient: "from-orange-900/40 to-orange-800/20",
  },
  {
    id: 6,
    slug: "flat-lay",
    title: "Flat Lay",
    titleVi: "Flat lay / Top-down",
    description: "Overhead arranged composition",
    descriptionVi: "Chụp từ trên, bố cục nghệ thuật",
    icon: "⬜",
    geminiPrompt: `Recreate this product in a flat lay top-down photography style for e-commerce.
Requirements:
- Camera directly overhead (bird's eye view, 90 degrees from top)
- Product arranged beautifully on a clean surface
- Add 2-3 tasteful complementary props or elements around the product
- Consistent, flat overhead lighting with minimal shadows
- Clean, aesthetic background (white, marble, wood, or linen texture)
- Square 1:1 aspect ratio
- Photorealistic
- No text, no watermarks`,
    openaiPrompt: `Flat lay top-down product photo, overhead 90-degree view, product centered with 2-3 complementary props, flat even lighting, clean aesthetic surface (marble or white), square format, photorealistic.`,
    bgGradient: "from-green-900/40 to-green-800/20",
  },
];

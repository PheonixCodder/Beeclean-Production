import BlogNavbar from "@/components/layout/blog-navbar";
import BlogFooter from "@/components/layout/blog-footer";

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <BlogNavbar />
      <main className="flex-1">{children}</main>
      <BlogFooter />
    </div>
  );
}


// /plan Hey the current design and layout of this page: @app/blogs/page.tsx is shit I want you to use the @.claude/design\ folder and everything inside it to  
//   create a stunning a great blog page for a mobile app. Note: Create a plan after exploring my whole codebase and fully knowing what kind of app it is which    
//   this website is for
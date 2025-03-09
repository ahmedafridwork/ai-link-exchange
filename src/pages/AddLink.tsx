
import { Navbar } from "@/components/layout/navbar";
import { LinkForm } from "@/components/features/link-form";

const AddLink = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Add New Link</h1>
            <p className="text-muted-foreground mt-2">
              Share an AI resource with the community
            </p>
          </div>
          
          <LinkForm />
        </div>
      </main>
    </div>
  );
};

export default AddLink;

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewsletterCTA() {
  return (
    <section
      className="
        mt-20
        overflow-hidden
        rounded-3xl
        border
        border-amber-100
        bg-gradient-to-r
        from-amber-50
        to-orange-50
        p-10
      "
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-bold">
          Stay Updated
        </h2>

        <p className="mt-4 text-muted-foreground">
          Get coaching insights, comparisons and
          admission updates directly in your inbox.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Input
            placeholder="Enter your email"
            className="h-12"
          />

          <Button className="h-12 bg-amber-500 hover:bg-amber-600">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}
import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";

export default async function Page() {
  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>

      <ContentBlock className="h-125 flex flex-col gap-3 justify-center items-center">
        <p className="text-lg">Welcome to your account page.</p>
      </ContentBlock>
    </main>
  );
}

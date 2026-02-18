import Logo from "@/components/logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-y-4">
      <Logo />
      {children}
    </div>
  );
}

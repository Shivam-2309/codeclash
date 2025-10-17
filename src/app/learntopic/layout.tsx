import NavigationUser from "@/app/components/NavigationUser";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <NavigationUser />
      {children}
    </section>
  );
}

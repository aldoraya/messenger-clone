import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import UserList from "./components/UserList";

export default async function usersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        {/* @ts-expect-error Server Component */}
        <UserList items={users} />
        {children}
        </div>
    </Sidebar>
  );
}

import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserUpdatePasswordCard from "../components/UserProfile/UserUpdatePasswordCard";
import useAuth from "@/hooks/api/use-auth";
import Loading from "@/components/Loading";

export default function UserProfiles() {
  const { data: authData, isLoading } = useAuth();
  const user = authData?.user;

  if (isLoading || !user) return <Loading />;

  return (
    <>
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard user={user} />
          <UserInfoCard user={user} />
          <UserUpdatePasswordCard />
        </div>
      </div>
    </>
  );
}

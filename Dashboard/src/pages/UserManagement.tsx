import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TableUsers from "@/components/userManagement/TableUsers";

export default function UserManagement() {
  return (
    <>
      <PageBreadcrumb pageTitle="Quản lý người dùng" />
      <div className="space-y-6">
        <ComponentCard title="Danh sách người dùng">
          <TableUsers />
        </ComponentCard>
      </div>
    </>
  );
}

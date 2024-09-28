import LayoutAuth from "@/components/ui/layoutauth";

const AccountLayout = ({children}) => {
  return (
    <>
    <LayoutAuth>
    {children}
    </LayoutAuth>
    </>
  )
}

export default AccountLayout;
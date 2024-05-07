import {getKindeServerSession, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/server";
import {redirect} from "next/navigation";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import {Button} from "@/components/ui/button";

const AdminPage = async () => {
  const {isAuthenticated} = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  return (
    <MaxWidthWrapper className='mb-12 mt-28 sm:mt-10 flex flex-col items-center justify-center'>
      <h2 className='mt-2 font-bold text-4xl text-blue-950 sm:text-5xl'>Panel admina</h2>
      <div className='mt-10 w-full flex flex-col justify-center items-center gap-y-3'>
        <Link href='/etap1'><Button>Głosowanie ETAP 1</Button></Link>
        <Link href='/etap1/preview'><Button>Podgląd wyników ETAP 1</Button></Link>
        <Link href='/etap1/results'><Button>Ostateczne wyniki ETAP 1</Button></Link>
        <Link href='/etap2'><Button>Głosowanie ETAP 2</Button></Link>
        <Link href='/etap2/preview'><Button>Podgląd wyników ETAP 2</Button></Link>
        <Link href='/etap2/results'><Button>Ostateczne wyniki ETAP 2</Button></Link>
        <Link href='/sponsors'><Button>Sponsorzy</Button></Link>
        <Link href='/turniej'><Button>Turniej</Button></Link>
        <Button><LogoutLink>Wyloguj</LogoutLink></Button>
      </div>
    </MaxWidthWrapper>
  );
}

export default AdminPage;
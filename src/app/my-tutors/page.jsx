import { authClient } from "@/lib/auth-client";


const MyTutorsPage = async () => {
    const { data: session } = authClient.useSession();
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-tutors?email=${session?.user?.email}`
    );

    const data = await res.json();
    console.log('data', data);
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Tutors Page</h1>
        </div>
    );
};

export default MyTutorsPage;
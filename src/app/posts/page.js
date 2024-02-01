import {sql} from "@vercel/postgres";
import { revalidatePath } from "next/cache";


export default async function Posts() {
    const posts = await sql `SELECT * FROM posts`;
    
    async function handleCreatePost(formData) {
        "use server";
        const title = formData.get("title")
        const content = formData.get("content")

        await sql`INSERT INTO posts (title, content) VALUES (${title}, ${content})`;

        revalidatePath("/posts");
    }

    return (
    <div>
        <h2>Posts</h2>

        {posts.rows.map((post)=>{
          return <div key={post.title}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
             </div>
        })}

         <form action={handleCreatePost}>
            <h4>Tell us what you think!</h4>
            <input name="title" placeholder="Username"/>
            <textarea name="content" placeholder="Comment"></textarea>
            <button>Submit</button>
         </form>
         
    </div>
    );
}

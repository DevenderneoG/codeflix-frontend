// "use client";

// const Comments = ({ comments }: { comments: any }) => {
//   if (!comments) return <p>No lead data available.</p>;

//   return (
//     <>
//       <section className="bg-white shadow-default dark:border-strokedark dark:bg-boxdark py-8 antialiased">
//         <div className="max-w-2xl mx-auto px-4">
//           {comments && comments.length > 0 ? (
//             <ul className="mt-2 space-y-2">
//               {comments.map((comment, index) => (
//                 <li key={index}>
//                   <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
//                     <footer className="flex justify-between items-center mb-2">
//                       <div className="flex items-center">
//                         <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
//                           <img
//                             className="mr-2 w-6 h-6 rounded-full"
//                             src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
//                             alt="Michael Gough"
//                           />
//                           {comment.author}
//                         </p>
//                         <p className="text-sm text-gray-600 dark:text-gray-400">
//                           <time
//                             dateTime="2022-02-08"
//                             title="February 8th, 2022"
//                           >
//                             {new Date(comment.createdAt).toLocaleDateString(
//                               "en-US",
//                               {
//                                 year: "numeric",
//                                 month: "short",
//                                 day: "numeric",
//                               }
//                             )}
//                           </time>
//                         </p>
//                       </div>
//                       {/* <button
//                         id="dropdownComment1Button"
//                         data-dropdown-toggle="dropdownComment1"
//                         className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//                         type="button"
//                       >
//                         <svg
//                           className="w-4 h-4"
//                           aria-hidden="true"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="currentColor"
//                           viewBox="0 0 16 3"
//                         >
//                           <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
//                         </svg>
//                         <span className="sr-only">Comment settings</span>
//                       </button> */}
//                       {/* <div
//                         id="dropdownComment1"
//                         className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
//                       >
//                         <ul
//                           className="py-1 text-sm text-gray-700 dark:text-gray-200"
//                           aria-labelledby="dropdownMenuIconHorizontalButton"
//                         >
//                           <li>
//                             <a
//                               href="#"
//                               className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                             >
//                               Edit
//                             </a>
//                           </li>
//                           <li>
//                             <a
//                               href="#"
//                               className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                             >
//                               Remove
//                             </a>
//                           </li>
//                           <li>
//                             <a
//                               href="#"
//                               className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                             >
//                               Report
//                             </a>
//                           </li>
//                         </ul>
//                       </div> */}
//                     </footer>
//                     <p className="text-gray-500 dark:text-gray-400">
//                       {comment.commentText}
//                     </p>
//                   </article>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No comments yet.</p>
//           )}
//           <form className="mb-6">
//             <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
//               <label htmlFor="comment" className="sr-only">
//                 Your comment
//               </label>
//               <textarea
//                 id="comment"
//                 rows="6"
//                 className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
//                 placeholder="Write a comment..."
//                 required
//               ></textarea>
//             </div>
//             <button
//               type="submit"
//               className="inline-flex items-center justify-center py-2.5 px-4 text-xs font-medium  bg-primary p-3 text-center text-gray min-w-[142px]  rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
//             >
//               Post comment
//             </button>
//           </form>         
//         </div>
//       </section>
//     </>
//   );
// };

// export default Comments;


"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { addComment } from "@/app/store/comments/commentSlice";

interface Props {
  comments: any[];
  leadId: string;
  authorId: string;
}

const Comments = ({ comments, leadId, authorId }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setSubmitting(true);
    try {
      await dispatch(
        addComment({ id: leadId, commentText, author: authorId })
      ).unwrap();
      setCommentText("");
      setFormError(null);
    } catch (err: any) {
      console.error("Submit Error:", err);
      setFormError(err || "Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-white shadow-md dark:bg-boxdark py-8 rounded-lg">
      <div className="max-w-2xl mx-auto px-4">
        {comments.length > 0 ? (
          <ul className="space-y-4">
            {comments.map((comment, index) => {
              if (!comment || comment?.error) {
                return (
                  <li key={index} className="text-red-500">
                    Invalid comment
                  </li>
                );
              }

              return (
                <li key={index}>
                  <article className="p-4 bg-gray-50 rounded dark:bg-gray-900">
                    <div className="flex items-center">
                      <p className="text-sm font-semibold text-black dark:text-white mr-3">
                        {comment.author || "Anonymous"}
                      </p>
                      <time className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{comment.commentText}</p>
                  </article>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}

        {/* Add Comment Form */}
        <form onSubmit={handleSubmit} className="mt-6">
          {formError && <p className="text-red-500 mb-2">{formError}</p>}
          <div className="mb-4">
            <textarea
              rows={4}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden   bg-transparent text-gray-900 dark:text-gray-300 text-gray-900 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
              placeholder="Write a comment..."
              required
              disabled={submitting}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-700"
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Comments;

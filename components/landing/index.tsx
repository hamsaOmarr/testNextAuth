import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import axios from "axios";
import mixpanel from "mixpanel-browser";

import styles from "@/styles/Landing.module.css";
import Logo from "@/public/img/logo.svg";
import landing_unsplace from "@/public/img/landing_unsplace.svg";

import { useSession, signIn, signOut } from "next-auth/react";

const Landing = () => {
  const { data: session } = useSession();

  if (process.env.NODE_ENV === "production") {
    mixpanel.init("5434b0e6952636ba7f9219d5ce06d941", { debug: true });
  }

  const [loading, setLoading] = useState(false);
  const [successmsg, setSuccessmsg] = useState(false);
  const [servermsg, setServermsg] = useState("");
  const [bid, setBid] = useState(150);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    await axios
      .post("http://localhost:5001/dev", data)
      .then((res) => {
        setServermsg(res.data);
        setLoading(false);
        setSuccessmsg(true);
        if (
          process.env.NODE_ENV === "production" &&
          res.data === "Thank you! Your submittion has been received!"
        ) {
          mixpanel.track("Successfull Waitlist Sign Up");
        }
      })
      .catch((err) => {
        console.log(err);
        if (process.env.NODE_ENV === "production") {
          mixpanel.track("Failed Waitlist Sign Up");
        }
      });
  };

  if (session) {
    console.log(session);
    return (
      <>
        Signed in as {session.user?.name}
        <br />
        <h3>Current bid: ${bid}</h3>
        <input type="text" placeholder="Enter bid amount..."/>
        <p>Enter ${bid + 100} or more</p>
        <br />
        <button onClick={async () => await signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("google")}>Sign in</button>
    </>
  );

  //   return (
  //     <>
  //       <div className={styles.landing_container}>
  //         <div className={styles.top_container}>
  //           <Image src={Logo} alt="modeltune" className={styles.modeltune_logo} />
  //           <div className={styles.landing_title}>
  //             {/* Want API Access to High Quality Fine-tuned GPT Models? */}
  //             {/* A Marketplace for Fine-tuned GPT Models accessible via API */}
  //             {/* Get API Access to High Quality Fine-tuned GPT Models by the
  //             Community */}
  //             Manage your OpenAI Model Users Token Usage
  //           </div>
  //           <div className={styles.landing_description}>
  //             We track and invoice your users for their OpenAI token usage on your
  //             behalf, allowing you to avoid the risk of large OpenAI bills or the
  //             need to ask for API keys.
  //             <br />
  //             <br />
  //             Your Users dont need to sign up until they finish their $5 in
  //             credits so their experience will be the same
  //             <br />
  //             <br />
  //             For Beta Access, join the waitlist below
  //           </div>

  //           {loading ? (
  //             <p className={styles.loading_text}>Loading...</p>
  //           ) : successmsg ? (
  //             <p className={styles.success_text}>{servermsg}</p>
  //           ) : (
  //             <form onSubmit={handleSubmit(onSubmit)}>
  //               <div className={styles.newsletter_container}>
  //                 <input
  //                   placeholder="Your Email..."
  //                   className={styles.input_container}
  //                   {...register("Email", {
  //                     required: "Required",
  //                     pattern: {
  //                       value: /^\S+@\S+$/i,
  //                       message: "Please enter a valid email address",
  //                     },
  //                   })}
  //                 />
  //                 <button type="submit" className={styles.join_btn}>
  //                   Join
  //                 </button>
  //                 <br />
  //               </div>
  //               <p className={styles.input_error_section}>
  //                 {errors.Email?.message?.toString()}
  //               </p>
  //             </form>
  //           )}

  //           <div className={styles.landing_image_conatainer}>
  //             <Image src={landing_unsplace} alt="landing" />
  //           </div>
  //         </div>
  //       </div>
  //       <div className={styles.bottom_container}>
  //         {/* <h1>Want to see your Models on the Platform?</h1>
  //         <div className={styles.contact_section}>
  //           Contact us at hamsa@modeltune.co
  //         </div>
  //         <div className={styles.read_email_section}>
  //           We read and reply to every email
  //         </div> */}
  //       </div>
  //       <div className={styles.copyright_container}>
  //         {/* <button
  //           className={styles.discord_btn}
  //           onClick={() => {
  //             if (process.env.NODE_ENV === "production") {
  //               mixpanel.track("Discord Link Clicked");
  //             }
  //           }}
  //         >
  //           <a
  //             href="https://discord.gg/V9XXAbJDKQ"
  //             target="_blank"
  //             rel="noreferrer"
  //             className={styles.discord_link}
  //           >
  //             Discord
  //           </a>
  //         </button> */}
  //         <div>Copyright © Modeltune 2023</div>
  //       </div>
  //     </>
  //   );
};

export default Landing;

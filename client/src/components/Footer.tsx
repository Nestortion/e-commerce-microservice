import {
  FaFacebook,
  FaGithub,
  FaYoutube,
  FaTwitter,
  FaArrowAltCircleRight,
  FaCopyright,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="h-[5vh] flex justify-between px-4 self-end w-screen items-center ">
      <div className="flex items-center gap-2 w-fit text-cyan-400">
        <FaCopyright />
        NG Development
      </div>
      <div className="flex items-center w-fit gap-2 text-cyan-400 text-xl">
        <FaFacebook />
        <FaGithub />
        <FaYoutube />
        <FaTwitter />
      </div>
      <div className="flex items-center w-fit gap-2 text-cyan-400">
        Check out my Portfolio! <FaArrowAltCircleRight />
      </div>
    </footer>
  );
}

export default Footer;

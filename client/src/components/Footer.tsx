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
    <footer className="h-[5vh] flex justify-between px-4 self-end w-full font-gudea font-bold">
      <div className="flex-1 flex items-center gap-2 w-fit text-cyan-400">
        <FaCopyright />
        NG Development
      </div>
      <div className="flex-1 flex justify-center items-center w-fit gap-2 text-cyan-400 text-xl">
        <a
          href="https://www.facebook.com/Hakuryuukou/"
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebook />
        </a>
        <a
          href="https://github.com/Nestortion"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
        </a>
        <a href="" target="_blank" rel="noreferrer">
          <FaYoutube />
        </a>
        <a href="https://twitter.com/ylalet" target="_blank" rel="noreferrer">
          <FaTwitter />
        </a>
      </div>
      <div className="flex-1 flex justify-end items-center w-fit gap-2 text-cyan-400">
        Check out my Portfolio! <FaArrowAltCircleRight />
      </div>
    </footer>
  );
}

export default Footer;

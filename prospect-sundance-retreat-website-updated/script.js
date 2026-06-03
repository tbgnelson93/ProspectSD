const inquiryForm = document.querySelector("#inquiryForm");
const siteHeader = document.querySelector(".site-header");
const parallaxImages = document.querySelectorAll(
  ".feature-image-wrap img, .cinema-feature img, .image-led-section img, .closing-gallery img"
);
const revealItems = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const syncHeader = () => {
  siteHeader?.classList.toggle("scrolled", window.scrollY > 80);
};

const syncMotion = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;

  document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}px`);
  document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));

  if (reduceMotion) {
    return;
  }

  parallaxImages.forEach((image) => {
    const rect = image.getBoundingClientRect();
    const viewportMid = window.innerHeight / 2;
    const imageMid = rect.top + rect.height / 2;
    const offset = (viewportMid - imageMid) * 0.035;
    image.style.transform = `translateY(${offset}px) scale(1.035)`;
  });
};

syncHeader();
syncMotion();
window.addEventListener("scroll", syncHeader, { passive: true });
window.addEventListener("scroll", syncMotion, { passive: true });
window.addEventListener("resize", syncMotion);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

inquiryForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(inquiryForm);
  const name = data.get("name") || "";
  const email = data.get("email") || "";
  const phone = data.get("phone") || "Not specified";
  const groupSize = data.get("groupSize") || "Not specified";
  const message = data.get("message") || "";

  const subject = "Prospect Sundance Retreat inquiry";
  const body = [
    "Hello,",
    "",
    "I am interested in the Prospect Sundance Retreat for Sundance Boulder 2027.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Group size: ${groupSize}`,
    "",
    "Message:",
    message,
  ].join("\n");

  window.location.href = `mailto:lnelson@thebasisgroup.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

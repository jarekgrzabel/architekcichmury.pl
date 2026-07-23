type CloudCLogoProps = {
  className?: string;
};

export function CloudCLogo({ className = "brand-mark" }: CloudCLogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="logo-blueprint-frame"
        d="M18 43V18h25M77 18h25v25M102 77v25H77M43 102H18V77"
      />
      <path
        className="logo-cloud-c"
        d="M93 42c-7-7-15-10-24-10-4-8-12-13-21-11-9 1-15 8-16 17-9 4-15 13-15 23 0 16 13 29 29 29h24c10 0 18-4 24-11"
      />
      <path className="logo-lambda-a" d="M38 83 60 39 82 83" />
      <circle className="logo-cloud-node" cx="94" cy="42" r="5" />
      <circle className="logo-cloud-node" cx="94" cy="79" r="5" />
    </svg>
  );
}

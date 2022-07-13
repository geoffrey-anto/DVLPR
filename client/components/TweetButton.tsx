import React from "react";

interface Props {
  styles: string;
}

function TweetButton({ styles }: Props) {
  return (
    <button className={styles}>
      Tweet
    </button>
  );
}

export default TweetButton;

import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

interface Quote {
  text: string;
  author: string;
}

const Quotes: React.FC = () => {
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const fetchQuoteData = () => {
    fetch("https://type.fit/api/quotes")
      .then(function (res: Response) {
        return res.json();
      })
      .then(function (data: Quote[]) {
        const random: Quote = data[Math.floor(Math.random() * data.length)];
        setQuote(random.text);
        setAuthor(random.author.slice(0, -10));
      });
  };

  useEffect(() => {
    fetchQuoteData();
  }, []);

  return (
    <>
      <p
        className="mt-3"
        style={{ maxWidth: "500px", fontSize: "1.25rem", fontWeight: "500" }}
      >
        "{quote}"
      </p>
      {author && <p>{author}</p>}
      {quote && !author && <p>author unknown</p>}
      <Button
        onClick={fetchQuoteData}
        variant="dark"
        className="mt-3"
        style={{ fontSize: "1.25rem" }}
      >
        ANOTHER QUOTE
      </Button>
    </>
  );
};

export default Quotes;

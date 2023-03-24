const Footer: React.FC = () => {
  const now: Date = new Date();
  const year: number = now.getFullYear();

  return (
    <footer className="text-center">
      <div className="text-center p-3">© {year} Julia Flejterska</div>
    </footer>
  );
};

export default Footer;

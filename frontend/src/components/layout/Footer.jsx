const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 dark:text-zinc-400">
        <p>© {new Date().getFullYear()} AutoShelf</p>

        <p>Vehicle Inventory Management System</p>
      </div>
    </footer>
  );
};

export default Footer;
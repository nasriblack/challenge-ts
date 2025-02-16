type Book = {
    id: string;
    title: string;
    author: string;
    copies: number
}


const addBook = (library: Book[], newBook: Book): Book[] => {
    const books = [...library, newBook]
    return books
}

const borrowBook = (library: Book[], bookId: string): Book[] => {
    return library.map(book =>
        book.id === bookId && book.copies > 0
            ? { ...book, copies: book.copies - 1 }
            : book
    );
};

const returnBook = (library: Book[], bookId: string): Book[] => {
    return library.map(book =>
        book.id === bookId ? { ...book, copies: book.copies + 1 } : book
    );
};

const findBookByTitle = (library: Book[], title: string): Book | null => {
    const book = library.find((item) => item.title === title)
    return book ?? null;
}

const getAvailableBooks = (library: Book[]): Book[] => {
    const bookAvailable = library.filter((item) => item.copies > 0)
    return bookAvailable;
}
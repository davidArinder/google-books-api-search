const { cleanedBookResults } = require("../api/utilities.js");

// data mutation from API
describe("Should format API results", () => {
  it("format results", () => {
    const harryPotter = [
      {
        kind: "books#volume",
        id: "ASImDQAAQBAJ",
        etag: "lHV2exzZ5Aw",
        selfLink: "https://www.googleapis.com/books/v1/volumes/ASImDQAAQBAJ",
        volumeInfo: {
          title: "Fantastic Beasts and Where to Find Them",
          authors: ["J.K. Rowling", "Newt Scamander"],
          publisher: "Pottermore Publishing",
          publishedDate: "2017-03-14",
          description:
            "The 2017 edition of this essential companion to the Harry Potter stories included a new foreword from J.K. Rowling (writing as Newt Scamander) and 6 new beasts! A set textbook at Hogwarts School of Witchcraft and Wizardry since publication, Newt Scamander's masterpiece has entertained wizarding families through the generations. Fantastic Beasts and Where to Find Them is an indispensable introduction to the magical beasts of the wizarding world. Scamander's years of travel and research have created a tome of unparalleled importance. Some of the beasts will be familiar to readers of the Harry Potter books - the Hippogriff, the Basilisk, the Hungarian Horntail... Others will surprise even the most ardent amateur Magizoologist. Dip in to discover the curious habits of magical beasts across five continents... At least 15% of the net retail price* of this eBook will be available to Comic Relief and Lumos Foundation for their work with children and young people to help them have a better life. 20% of these monies will be used by Comic Relief and 80% will be used by Lumos Foundation. * The net retail price means the price paid by the consumer less applicable sales taxes Comic Relief is a registered charity in the UK with charity nos. 326568 (England/Wales) and SC039730 (Scotland). Lumos Foundation is a registered charity in the UK with no. 1112575. Please note: This is the 2017 edition of the Hogwarts Library ebook, featuring bespoke cover artwork from Olly Moss and a new foreword from J.K. Rowling. The official screenplay of the 2016 Warner Bros. movie - Fantastic Beasts and Where to Find Them: The Original Screenplay - is available separately.",
          industryIdentifiers: [
            {
              type: "ISBN_13",
              identifier: "9781781105566",
            },
            {
              type: "ISBN_10",
              identifier: "1781105561",
            },
          ],
          readingModes: {
            text: true,
            image: false,
          },
          pageCount: 144,
          printType: "BOOK",
          categories: ["Fiction"],
          averageRating: 4,
          ratingsCount: 80,
          maturityRating: "NOT_MATURE",
          allowAnonLogging: true,
          contentVersion: "1.7.9.0.preview.2",
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false,
          },
          imageLinks: {
            smallThumbnail:
              "http://books.google.com/books/content?id=ASImDQAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
            thumbnail:
              "http://books.google.com/books/content?id=ASImDQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
          },
          language: "en",
          previewLink:
            "http://books.google.com/books?id=ASImDQAAQBAJ&dq=harry+potter&hl=&cd=1&source=gbs_api",
          infoLink:
            "http://books.google.com/books?id=ASImDQAAQBAJ&dq=harry+potter&hl=&source=gbs_api",
          canonicalVolumeLink:
            "https://books.google.com/books/about/Fantastic_Beasts_and_Where_to_Find_Them.html?hl=&id=ASImDQAAQBAJ",
        },
        saleInfo: {
          country: "US",
          saleability: "NOT_FOR_SALE",
          isEbook: false,
        },
        accessInfo: {
          country: "US",
          viewability: "NO_PAGES",
          embeddable: false,
          publicDomain: false,
          textToSpeechPermission: "ALLOWED",
          epub: {
            isAvailable: true,
          },
          pdf: {
            isAvailable: true,
          },
          webReaderLink:
            "http://play.google.com/books/reader?id=ASImDQAAQBAJ&hl=&printsec=frontcover&source=gbs_api",
          accessViewStatus: "NONE",
          quoteSharingAllowed: false,
        },
        searchInfo: {
          textSnippet:
            "Lumos Foundation is a registered charity in the UK with no. 1112575. Please note: This is the 2017 edition of the Hogwarts Library ebook, featuring bespoke cover artwork from Olly Moss and a new foreword from J.K. Rowling.",
        },
      },
    ];
    const cleanedBook = cleanedBookResults(harryPotter);
    const expectedResult = [
      {
        author: "J.K. Rowling, Newt Scamander",
        categories: ["Fiction"],
        description:
          "The 2017 edition of this essential companion to the Harry Potter stories included a new foreword from J.K. Rowling (writing as Newt Scamande...",
        id: "ASImDQAAQBAJ",
        link:
          "http://books.google.com/books?id=ASImDQAAQBAJ&dq=harry+potter&hl=&cd=1&source=gbs_api",
        pageCount: 144,
        publishedDate: "2017-03-14",
        publisher: "Pottermore Publishing",
        query: undefined,
        subtitle: undefined,
        thumbnail:
          "http://books.google.com/books/content?id=ASImDQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
        timestamp: undefined,
        title: "Fantastic Beasts and Where to Find Them",
      },
    ];
    expect(cleanedBook).toStrictEqual(expectedResult);
  });
});

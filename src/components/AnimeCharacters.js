import axios from "axios";
import React, { useState, useEffect } from "react";

function AnimeCharacters() {
  const [animeChar, setAnimeChar] = useState([]);
  const [inputText, setInputText] = useState("");

  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  console.log(pageCount, "pcout");

  const inputHandler = (e) => {
    setInputText(e.target.value.toLowerCase());
    console.log(e.target.value.toLowerCase());
  };

  // handle next

  const handleNext = () => {
    if (page === pageCount) return page;
    setPage(page + 1);
  };

  // handle previous

  const handlePrev = () => {
    console.log("perv clicked");

    if (page === 1) return page;
    setPage(page - 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.jikan.moe/v4/characters?sort=desc
        `
      )
      .then((response) => {
        console.log(response.data.data, "response");
        console.log(response.data.data[0].images.jpg.image_url, "response33");
        setAnimeChar(response.data.data);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }, [page]);

  useEffect(() => {
    const pageDataCount = Math.ceil(animeChar.length / 4);
    setPageCount(pageDataCount);
    if (page) {
      const LIMIT = 4;
      const skip = LIMIT * page; //
      const dataSkip = animeChar.slice(page === 1 ? 0 : skip - LIMIT, skip);
      setPageData(dataSkip);
    }
  }, [animeChar]);
  return (
    <>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" class="form-label"></label>
        <input
          onChange={inputHandler}
          type="search"
          id="exampleInputEmail1"
          placeholder="search here..."
          aria-describedby="emailHelp"
        ></input>
      </div>

      <div className="on">
        {pageData
          .filter((element) => {
            // console.log(element, "elele");
            if (element === "") {
              return element;
            } else {
              return (
                element.name.toLowerCase().includes(inputText) ||
                element.name_kanji.toLowerCase().includes(inputText)
              );
            }
          })
          .map((characters) => (
            <div
              className="card"
              style={{ width: "300px" }}
              key={characters.mal_id}
            >
              {/* <img src={p} className="card-img-top" alt="..."></img> */}
              <img
                src={characters.images.jpg.image_url}
                className="card-img-top"
                style={{ width: "300px", height: "250px" }}
                alt="..."
              ></img>
              <div className="card-body">
                <h5 className="card-title">Name: {characters.name}</h5>
                <h5 className="card-title">
                  Name_Kanji: {characters.name_kanji}
                </h5>
                <p
                  className="card-text"
                  style={{
                    maxHeight: "200px",
                    overflow: "auto",
                  }}
                >
                  About Me: {characters.about}
                </p>
                <div class="fav">
                  {characters.favorites}
                  <i class="material-icons">favorite</i>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <a href={characters.url} class="btn btn-primary">
                    <i class="material-icons" style={{ width: "200px" }}>
                      arrow_forward
                    </i>
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="d-flex justify-content-end">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a
                class="page-link"
                href="#"
                onClick={handlePrev}
                disabled={page === 1}
              >
                Previous
              </a>
            </li>
            {Array(pageCount)
              .fill(null)
              .map((ele, index) => {
                return (
                  <>
                    <li class="page-item">
                      <a
                        class="page-link"
                        href="#"
                        active={page === index + 1 ? true : false}
                        onClick={() => setPage(index + 1)}
                      >
                        {index + 1}
                      </a>
                    </li>
                  </>
                );
              })}

            <li class="page-item">
              <a
                class="page-link"
                href="#"
                onClick={handleNext}
                disabled={page === pageCount}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default AnimeCharacters;

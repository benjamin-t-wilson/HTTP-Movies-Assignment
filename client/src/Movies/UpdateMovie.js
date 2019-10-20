import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateMovie = props => {
  const [updateFilm, setUpdateFilm] = useState({
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
  });

  const [previewState, setPreviewState] = useState(false);

  const id = props.match.params.id;

  const handleChange = e => {
    setUpdateFilm({ ...updateFilm, [e.target.name]: e.target.value });
  };

  const handlePreview = e => {
    e.preventDefault();
    setUpdateFilm({ ...updateFilm, stars: updateFilm.stars.split(", ") });
    setPreviewState(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (previewState) {
      axios
        .put(`http://localhost:5000/api/movies/${id}`, updateFilm)
        .then(res => {
          props.history.push("/");
        })
        .catch(err => {
          console.log("Error: ", err);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setUpdateFilm({ ...res.data, stars: res.data.stars.join(", ") });
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  }, [id]);

  return (
    <div className="updateMovie">
      <form onSubmit={previewState ? handleSubmit : handlePreview}>
        <h1>
          Title:{" "}
          {previewState ? (
            updateFilm.title
          ) : (
            <input
              type="text"
              name="title"
              value={updateFilm.title}
              placeholder="Title"
              onChange={handleChange}
            />
          )}
        </h1>
        <p>
          Director:{" "}
          {previewState ? (
            updateFilm.director
          ) : (
            <input
              type="text"
              name="director"
              value={updateFilm.director}
              placeholder="Director"
              onChange={handleChange}
            />
          )}
        </p>
        <p>
          Metascore:{" "}
          {previewState ? (
            updateFilm.metascore
          ) : (
            <input
              type="text"
              name="metascore"
              value={updateFilm.metascore}
              placeholder="Metascore"
              onChange={handleChange}
            />
          )}
        </p>
        <p>
          Stars:{" "}
          {previewState ? (
            updateFilm.stars
          ) : (
            <input
              type="text"
              name="stars"
              value={updateFilm.stars}
              placeholder="Stars"
              onChange={handleChange}
            />
          )}
        </p>
        <button type="submit">
          {previewState ? "Commit Changes" : "Preview Changes"}
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;

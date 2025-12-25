import { useState, useRef, useEffect, useCallback } from "react";

import type { Place } from "./utils/type-utils.ts";
import { AVAILABLE_PLACES } from "./utils/data.ts";
import Places from "./components/Places.tsx";
import Modal from "./components/Modal.tsx";
import DeleteConfirmation from "./components/DeleteConfirmation.tsx";
import { sortPlacesByDistance } from "./utils/loc.ts";
import logoImg from "./assets/logo.png";
import "./App.css";

function App() {
  const storedIds: string[] = JSON.parse(
    localStorage.getItem("selectedPlaces") || "[]"
  );
  const storedPlaces = storedIds.map(
    (id: string) => AVAILABLE_PLACES.find((place) => place.id === id)!
  );
  const selectedPlace = useRef<string>("");

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [availablePlaces, setAvailablePlaces] = useState<Place[]>([]);
  const [pickedPlaces, setPickedPlaces] = useState<Place[]>(storedPlaces);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        latitude,
        longitude
      );
      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  function handleStartRemovePlace(id: string) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id: string) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id)!;
      return [place, ...prevPickedPlaces];
    });
    const storedIds: string[] = JSON.parse(
      localStorage.getItem("selectedPlaces") || "[]"
    );
    if (!storedIds.includes(id)) {
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([id, ...storedIds])
      );
    }
  }

  const handleRemovePlace = useCallback(() => {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModalIsOpen(false);
    const storedIds: string[] = JSON.parse(
      localStorage.getItem("selectedPlaces") || "[]"
    ).filter((id: string) => id !== selectedPlace.current);
    localStorage.setItem("selectedPlaces", JSON.stringify([...storedIds]));
  }, []);

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;

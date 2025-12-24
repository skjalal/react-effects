import type { Ref } from "react";

type Place = {
  id: string;
  title: string;
  image: {
    src: string;
    alt: string;
  };
  lat: number;
  lon: number;
};

type PlacesProps = {
  title: string;
  places: Place[];
  fallbackText?: string;
  onSelectPlace: (id: string) => void;
};

type DeleteConfirmationProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

type ModalProps = {
  ref: Ref<ModelRef>;
};

type ModelRef = {
  open: () => void;
  close: () => void;
};
export {
  type Place,
  type PlacesProps,
  type DeleteConfirmationProps,
  type ModalProps,
  type ModelRef,
};

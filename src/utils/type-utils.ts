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
  open: boolean;
  onClose: () => void;
};

type ProgressBarProps = {
  timer: number;
};

export {
  type Place,
  type PlacesProps,
  type DeleteConfirmationProps,
  type ModalProps,
  type ProgressBarProps,
};

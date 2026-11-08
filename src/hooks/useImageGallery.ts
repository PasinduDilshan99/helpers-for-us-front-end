// hooks/useImageGallery.ts
import { useState, useCallback } from "react";

interface UseImageGalleryOptions {
  initialIndex?: number;
  autoResetIndex?: boolean;
}

interface UseImageGalleryReturn {
  currentIndex: number;
  imgTransition: boolean;
  isModalOpen: boolean;
  isExpandedGalleryOpen: boolean;
  setCurrentIndex: (index: number) => void;
  changeImage: (index: number) => void;
  handlePrevImage: (imagesLength: number) => void;
  handleNextImage: (imagesLength: number) => void;
  handleImageClick: (index: number) => void;
  handleModalClose: () => void;
  openExpandedGallery: () => void;
  closeExpandedGallery: () => void;
  resetGallery: () => void;
}

export const useImageGallery = (
  options: UseImageGalleryOptions = {},
): UseImageGalleryReturn => {
  const { initialIndex = 0, autoResetIndex = true } = options;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [imgTransition, setImgTransition] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpandedGalleryOpen, setIsExpandedGalleryOpen] = useState(false);

  const changeImage = useCallback((idx: number) => {
    setImgTransition(true);
    setTimeout(() => {
      setCurrentIndex(idx);
      setImgTransition(false);
    }, 160);
  }, []);

  const handlePrevImage = useCallback(
    (imagesLength: number) => {
      const next = currentIndex === 0 ? imagesLength - 1 : currentIndex - 1;
      changeImage(next);
    },
    [currentIndex, changeImage],
  );

  const handleNextImage = useCallback(
    (imagesLength: number) => {
      changeImage((currentIndex + 1) % imagesLength);
    },
    [currentIndex, changeImage],
  );

  const handleImageClick = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const openExpandedGallery = useCallback(() => {
    setIsExpandedGalleryOpen(true);
  }, []);

  const closeExpandedGallery = useCallback(() => {
    setIsExpandedGalleryOpen(false);
  }, []);

  const resetGallery = useCallback(() => {
    if (autoResetIndex) {
      setCurrentIndex(initialIndex);
    }
    setImgTransition(false);
    setIsModalOpen(false);
    setIsExpandedGalleryOpen(false);
  }, [autoResetIndex, initialIndex]);

  return {
    currentIndex,
    imgTransition,
    isModalOpen,
    isExpandedGalleryOpen,
    setCurrentIndex,
    changeImage,
    handlePrevImage,
    handleNextImage,
    handleImageClick,
    handleModalClose,
    openExpandedGallery,
    closeExpandedGallery,
    resetGallery,
  };
};

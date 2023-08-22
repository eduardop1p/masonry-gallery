'use client';

import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';

import { MasonryContainer } from './styled';

interface Props {
  photos: any;
}

export default function MasonryPin({ photos }: Props) {
  const [columnCount, setColumnCount] = useState(6);
  const [columnWidth, setColumnWidth] = useState(6.5);
  const maxWidth1250 = useMediaQuery({ maxWidth: 1250 });

  const newPhotos = [];
  const photosArrayLength = Math.ceil(photos.length / columnCount);
  for (let i = 0; i < photos.length; i += photosArrayLength) {
    newPhotos.push(photos.slice(i, i + photosArrayLength));
  }

  const handleLoadImg = useCallback(
    (img: HTMLImageElement) => {
      const parent = img.parentElement as HTMLDivElement;
      const windowWidth = window.innerWidth;
      const aspectoRatio = img.naturalWidth / img.naturalHeight;
      const parentWidth = windowWidth / columnWidth;
      const parentHeight = parentWidth / aspectoRatio;

      parent.style.width = `${parentWidth.toFixed(0)}px`;
      parent.style.height = `${parentHeight.toFixed(0)}px`;
    },
    [columnWidth]
  );

  const handleGetAllPin = useCallback(() => {
    document.querySelectorAll('.pin').forEach((img: Element) => {
      handleLoadImg(img as HTMLImageElement);
    });
  }, [handleLoadImg]);

  const handleMediaQuery = useCallback(() => {
    if (maxWidth1250) {
      setColumnCount(5);
      setColumnWidth(5.5);
      handleGetAllPin();
      return;
    }
    setColumnCount(6);
    setColumnWidth(6.5);
    handleGetAllPin();
  }, [maxWidth1250, handleGetAllPin]);

  useEffect(() => {
    window.onresize = () => {
      handleGetAllPin();
    };
  }, [handleGetAllPin]);

  useEffect(() => {
    handleMediaQuery();
  }, [handleMediaQuery]);

  return (
    <div>
      <h2
        style={{
          textAlign: 'center',
          margin: '2rem 0',
          fontSize: '1rem',
        }}
      >
        Masonry gallery
      </h2>
      <MasonryContainer $columnWidth={columnWidth} $marginColumn="1rem">
        {newPhotos.map((arrays: any, index: number) => (
          <div key={index} className="masonry-column">
            {arrays.map((value: any) => (
              <div key={value.id} className="pin-container">
                <Image
                  className="pin"
                  src={value.src.medium}
                  alt={value.alt}
                  loading="eager"
                  fill
                  sizes="100%"
                  onLoadingComplete={img => handleLoadImg(img)}
                />
              </div>
            ))}
          </div>
        ))}
      </MasonryContainer>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const maxWidth1400 = useMediaQuery({ maxWidth: 1400 });
  const maxWidth1100 = useMediaQuery({ maxWidth: 1100 });
  const maxWidth850 = useMediaQuery({ maxWidth: 850 });
  const maxWidth500 = useMediaQuery({ maxWidth: 500 });

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
    if (maxWidth500) {
      setColumnCount(2);
      setColumnWidth(2.5);
      handleGetAllPin();
    } else if (maxWidth850) {
      setColumnCount(3);
      setColumnWidth(3.5);
      handleGetAllPin();
    } else if (maxWidth1100) {
      setColumnCount(4);
      setColumnWidth(4.5);
      handleGetAllPin();
    } else if (maxWidth1400) {
      setColumnCount(5);
      setColumnWidth(5.5);
      handleGetAllPin();
    } else {
      setColumnCount(6);
      setColumnWidth(6.5);
      handleGetAllPin();
    }
  }, [maxWidth1400, maxWidth1100, maxWidth850, maxWidth500, handleGetAllPin]);

  useEffect(() => {
    window.onresize = () => {
      // handleGetAllPin();
      handleMediaQuery();
    };
  }, [handleMediaQuery]);

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

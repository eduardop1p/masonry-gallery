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
  const maxWidth1515 = useMediaQuery({ maxWidth: 1515 });
  const maxWidth1270 = useMediaQuery({ maxWidth: 1270 });
  const maxWidth1020 = useMediaQuery({ maxWidth: 1020 });
  const maxWidth770 = useMediaQuery({ maxWidth: 770 });
  const maxWidth520 = useMediaQuery({ maxWidth: 520 });

  const newPhotos = [];
  const photosArrayLength = Math.ceil(photos.length / columnCount);
  for (let i = 0; i < photos.length; i += photosArrayLength) {
    newPhotos.push(photos.slice(i, i + photosArrayLength));
  }

  const handleLoadImg = useCallback((img: HTMLImageElement) => {
    const parent = img.parentElement as HTMLDivElement;
    const windowWidth = window.innerWidth;
    const aspectoRatio = img.naturalWidth / img.naturalHeight;
    // const parentWidth = windowWidth / columnWidth;
    const parentWidth = 233;
    const parentHeight = parentWidth / aspectoRatio;

    parent.style.width = `${parentWidth.toFixed(0)}px`;
    parent.style.width = `100%`;
    parent.style.height = `${parentHeight.toFixed(0)}px`;
  }, []);

  const handleGetAllPin = useCallback(() => {
    document.querySelectorAll('.pin').forEach((img: Element) => {
      handleLoadImg(img as HTMLImageElement);
    });
  }, [handleLoadImg]);

  const handleMediaQuery = useCallback(() => {
    if (maxWidth520) {
      setColumnCount(1);
      // setColumnWidth(1.5);
      // handleGetAllPin();
    }
    if (maxWidth770) {
      setColumnCount(2);
      // setColumnWidth(2.5);
      // handleGetAllPin();
      return;
    }
    if (maxWidth1020) {
      setColumnCount(3);
      // setColumnWidth(3.5);
      // handleGetAllPin();
      return;
    }
    if (maxWidth1270) {
      setColumnCount(4);
      // setColumnWidth(4.5);
      // handleGetAllPin();
      return;
    }
    if (maxWidth1515) {
      setColumnCount(5);
      // setColumnWidth(5.5);
      // handleGetAllPin();
      return;
    }
    setColumnCount(6);
    // setColumnWidth(6.5);
    // handleGetAllPin();
  }, [maxWidth1515, maxWidth1270, maxWidth1020, maxWidth770, maxWidth520]);

  // useEffect(() => {
  //   handleMediaQuery();
  //   window.onresize = () => {
  //     handleGetAllPin();
  //     handleMediaQuery();
  //   };
  // }, [handleGetAllPin, handleMediaQuery]);

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

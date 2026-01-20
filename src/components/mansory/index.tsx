/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { default as NextImage } from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSearchParams } from 'next/navigation';

import { MasonryContainer } from './styled';

interface Props {
  photos: any;
}

export default function MasonryPin({ photos }: Props) {
  const [loaderPin, setLoaderPin] = useState(true);
  const serachParam = useSearchParams();

  const [columnCount, setColumnCount] = useState(6);
  const [columnWidth, setColumnWidth] = useState(6.5);
  const maxWidth1400 = useMediaQuery({ maxWidth: 1400 });
  const maxWidth1200 = useMediaQuery({ maxWidth: 1200 });
  const maxWidth1050 = useMediaQuery({ maxWidth: 1050 });
  const maxWidth850 = useMediaQuery({ maxWidth: 850 });
  const maxWidth500 = useMediaQuery({ maxWidth: 500 });

  const newPhotos = [];
  const photosArrayLength = Math.ceil(photos.length / columnCount);
  for (let i = 0; i < photos.length; i += photosArrayLength) {
    newPhotos.push(photos.slice(i, i + photosArrayLength));
  }

  const handleLoadImg = useCallback(
    (img: HTMLImageElement) => {
      const windowWidth = window.innerWidth;
      const aspectoRatio = img.naturalWidth / img.naturalHeight;

      const parent = img.parentElement as HTMLDivElement;
      const parentWidth = windowWidth / columnWidth;
      const parentHeight = parentWidth / aspectoRatio;

      // parent.style.width = `${parentWidth.toFixed(0)}px`;
      parent.style.width = `100%`;
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
      setColumnWidth(2.2);
      handleGetAllPin();
    } else if (maxWidth850) {
      setColumnCount(3);
      setColumnWidth(3.3);
      handleGetAllPin();
    } else if (maxWidth1050) {
      setColumnCount(4);
      setColumnWidth(4.35);
      handleGetAllPin();
    } else if (maxWidth1200) {
      setColumnCount(4);
      setColumnWidth(4.3);
      handleGetAllPin();
    } else if (maxWidth1400) {
      setColumnCount(5);
      setColumnWidth(5.4);
      handleGetAllPin();
    } else {
      setColumnCount(6);
      setColumnWidth(6.5);
      handleGetAllPin();
    }
  }, [
    maxWidth1400,
    maxWidth1200,
    maxWidth1050,
    maxWidth850,
    maxWidth500,
    handleGetAllPin,
  ]);

  useEffect(() => {
    // handleGetAllPin();
    // handleMediaQuery();
    window.onresize = () => {
      handleMediaQuery();
    };
  }, [handleMediaQuery, handleGetAllPin]);

  useEffect(() => {
    // if (loaderPin === photos.length)
  }, [photos, loaderPin]);

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
              <div className="pin-info" key={value.id}>
                <div className="pin-container">
                  <NextImage
                    className="pin"
                    src={value.src.medium}
                    alt={value.alt}
                    loading="eager"
                    fill
                    onLoadingComplete={img => {
                      // img.nextSibling?.remove();
                      handleLoadImg(img);
                    }}
                    sizes="100%"
                  />
                  <Loading pinH={value.src.medium} />
                </div>
                <h4 title={value.alt}>{value.alt}</h4>
              </div>
            ))}
          </div>
        ))}
      </MasonryContainer>
    </div>
  );
}

function Loading({ pinH }: { pinH: any }) {
  console.log(pinH);
  return (
    <div
      style={{
        width: `100%`,
        height: `${pinH}px`,
        background: '#333',
        borderRadius: '1rem',
        position: 'absolute',
        zIndex: '2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p style={{ color: '#fff' }}>Carregando...</p>
    </div>
  );
}

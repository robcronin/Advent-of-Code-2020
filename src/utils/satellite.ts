/*
 * Pretty ugly, duplicatedcode in this file ;(
 */

import { SatelliteImage, SatelliteRule } from './input';

export const getValidPatternsForRule = (
  ruleNum: number,
  rules: Record<number, SatelliteRule>,
  currentPatterns: string[] = [''],
): string[] => {
  const rule = rules[ruleNum];
  if (rule.pattern !== undefined) {
    return currentPatterns.map(
      (currentPattern) => currentPattern + rule.pattern,
    );
  } else {
    return rule.subRules.reduce((acc: string[], subRule) => {
      const newSubPatterns = subRule.reduce((acc, subRuleNum) => {
        const subRulePatterns = getValidPatternsForRule(subRuleNum, rules);
        const nextResult: string[] = [];
        acc.forEach((current) => {
          subRulePatterns.forEach((subRulePattern) => {
            nextResult.push(current + subRulePattern);
          });
        });
        return nextResult;
      }, currentPatterns);
      return [...acc, ...newSubPatterns];
    }, []);
  }
};

export const findMatchingImageForBorder = (
  id: number,
  border: string,
  satelliteImages: Record<number, SatelliteImage>,
): { id: number; flip: boolean; borderIndex: number } | undefined => {
  let borderIndex: number = 0;
  let flip: boolean = false;
  const image = Object.values(satelliteImages).find((satelliteImage) => {
    const matchForward = satelliteImage.borders.findIndex((b) => b === border);
    const backwardBorder = [...border].reverse().join('');
    const matchBackward = satelliteImage.borders.findIndex(
      (b) => b === backwardBorder,
    );
    if (matchBackward !== -1) {
      flip = true;
      borderIndex = matchBackward;
    }
    if (matchForward !== -1) {
      flip = false;
      borderIndex = matchForward;
    }
    return (
      satelliteImage.id !== id && (matchForward !== -1 || matchBackward !== -1)
    );
  });
  return image !== undefined
    ? {
        id: image.id,
        flip,
        borderIndex,
      }
    : undefined;
};

export const getImageIdsByNumEdges = (
  satelliteImages: Record<number, SatelliteImage>,
  targetNumEdges: number,
): number[] =>
  Object.values(satelliteImages).reduce((acc: number[], satelliteImage) => {
    let numEdges = 0;
    satelliteImage.borders.forEach((border) => {
      const edge = findMatchingImageForBorder(
        satelliteImage.id,
        border,
        satelliteImages,
      );
      if (edge) numEdges++;
    });
    if (numEdges === targetNumEdges) return [...acc, satelliteImage.id];
    return acc;
  }, []);

export const rotateImage90 = (image: string[]): string[] => {
  const newImage: string[] = [];
  for (let r = 0; r < image[0].length; r++) {
    newImage.push('');
    for (let c = 0; c < image.length; c++) {
      newImage[r] += image[image.length - c - 1][r];
    }
  }
  return newImage;
};

export const rotateImage90Times = (
  image: string[],
  times: number,
): string[] => {
  let rotatedImage = [...image];
  for (let i = 0; i < times; i++) {
    rotatedImage = rotateImage90(rotatedImage);
  }
  return rotatedImage;
};

export const flipImageHorizontally = (image: string[]): string[] => {
  const newImage: string[] = [];
  for (let r = 0; r < image.length; r++) {
    newImage.push('');
    for (let c = 0; c < image[0].length; c++) {
      newImage[r] += image[image.length - r - 1][c];
    }
  }
  return newImage;
};

export const flipImageVertically = (image: string[]): string[] => {
  const newImage: string[] = [];
  for (let r = 0; r < image.length; r++) {
    newImage.push('');
    for (let c = 0; c < image[0].length; c++) {
      newImage[r] += image[r][image[0].length - c - 1];
    }
  }
  return newImage;
};

export const addImageToFullGrid = (
  fullGrid: string[],
  image: string[],
  addRight: boolean,
): string[] => {
  const newGrid = [...fullGrid];
  if (addRight) {
    for (let r = 1; r < image.length - 1; r++) {
      for (let c = 1; c < image[0].length - 1; c++) {
        newGrid[r - 1 + fullGrid.length - image.length + 2] += image[r][c];
      }
    }
  } else {
    for (let r = 1; r < image.length - 1; r++) {
      newGrid.push('');
      for (let c = 1; c < image[0].length - 1; c++) {
        newGrid[newGrid.length - 1] += image[r][c];
      }
    }
  }
  return newGrid;
};

export const getEdge = (image: string[], rightEdge: boolean): string => {
  if (rightEdge) {
    return image.reduce((edge, row) => (edge += row[row.length - 1]), '');
  }
  return image[image.length - 1];
};

export const getAllBorders = (
  image: string[],
): {
  borders: [string, string, string, string];
  top: string;
  right: string;
  bottom: string;
  left: string;
} => {
  const { left, right } = image.reduce(
    (acc, row) => {
      return {
        left: acc.left + row[0],
        right: acc.right + row[row.length - 1],
      };
    },
    {
      left: '',
      right: '',
    },
  );

  return {
    borders: [image[0], right, image[image.length - 1], left],
    top: image[0],
    right,
    bottom: image[image.length - 1],
    left,
  };
};

export const getRotatedFirstCorner = (
  corners: number[],
  satelliteImages: Record<number, SatelliteImage>,
): SatelliteImage => {
  const topLeft = satelliteImages[corners[0]];
  const isTop = findMatchingImageForBorder(
    topLeft.id,
    topLeft.top,
    satelliteImages,
  );
  const isRight = findMatchingImageForBorder(
    topLeft.id,
    topLeft.right,
    satelliteImages,
  );
  const isBottom = findMatchingImageForBorder(
    topLeft.id,
    topLeft.bottom,
    satelliteImages,
  );
  const isLeft = findMatchingImageForBorder(
    topLeft.id,
    topLeft.left,
    satelliteImages,
  );

  let rotatatedTopLeft = topLeft.image;
  if (isTop && isRight)
    rotatatedTopLeft = rotateImage90Times(rotatatedTopLeft, 1);
  else if (isBottom && isLeft)
    rotatatedTopLeft = rotateImage90Times(rotatatedTopLeft, 3);
  /* istanbul ignore next */ else if (isLeft && isTop)
    rotatatedTopLeft = rotateImage90Times(rotatatedTopLeft, 2);

  return {
    ...topLeft,
    ...getAllBorders(rotatatedTopLeft),
    image: rotatatedTopLeft,
  };
};

export const getNextRightImage = (
  lastImage: SatelliteImage,
  satelliteImages: Record<number, SatelliteImage>,
): SatelliteImage | undefined => {
  const nextImage = findMatchingImageForBorder(
    lastImage.id,
    lastImage.right,
    satelliteImages,
  );
  if (!nextImage) return undefined;
  let imageToAdd = rotateImage90Times(
    satelliteImages[nextImage.id].image,
    3 - nextImage.borderIndex,
  );
  if (nextImage.borderIndex < 2) imageToAdd = flipImageHorizontally(imageToAdd);
  if (nextImage.flip) imageToAdd = flipImageHorizontally(imageToAdd);
  return { image: imageToAdd, ...getAllBorders(imageToAdd), id: nextImage.id };
};

export const getNextBottomImage = (
  lastImage: SatelliteImage,
  satelliteImages: Record<number, SatelliteImage>,
): SatelliteImage | undefined => {
  const nextImage = findMatchingImageForBorder(
    lastImage.id,
    lastImage.bottom,
    satelliteImages,
  );
  if (!nextImage) return undefined;
  let numFlips = nextImage.borderIndex;
  if (nextImage.borderIndex === 1) numFlips = 3;
  else if (nextImage.borderIndex === 3) numFlips = 1;
  let imageToAdd = rotateImage90Times(
    satelliteImages[nextImage.id].image,
    numFlips,
  );
  if (nextImage.borderIndex >= 2) imageToAdd = flipImageVertically(imageToAdd);
  if (nextImage.flip) imageToAdd = flipImageVertically(imageToAdd);
  return { image: imageToAdd, ...getAllBorders(imageToAdd), id: nextImage.id };
};

export const fillInImageGrid = (
  satelliteImages: Record<number, SatelliteImage>,
): string[] => {
  const corners = getImageIdsByNumEdges(satelliteImages, 2);
  let fullGrid: string[] = [];
  const rotatatedTopLeft = getRotatedFirstCorner(corners, satelliteImages);

  fullGrid = addImageToFullGrid(fullGrid, rotatatedTopLeft.image, false);

  let lastImage = rotatatedTopLeft;
  let lastStartRowImage = rotatatedTopLeft;
  while (true) {
    const nextRightImage = getNextRightImage(lastImage, satelliteImages);
    if (!nextRightImage) {
      const nextBottomImage = getNextBottomImage(
        lastStartRowImage,
        satelliteImages,
      );
      if (!nextBottomImage) {
        break;
      }
      fullGrid = addImageToFullGrid(fullGrid, nextBottomImage.image, false);
      lastImage = nextBottomImage;
      lastStartRowImage = nextBottomImage;
    } else {
      fullGrid = addImageToFullGrid(fullGrid, nextRightImage.image, true);
      lastImage = nextRightImage;
    }
  }
  return fullGrid;
};

const seaMonsterPattern: [number, number][] = [
  [0, 18],
  [1, 0],
  [1, 5],
  [1, 6],
  [1, 11],
  [1, 12],
  [1, 17],
  [1, 18],
  [1, 19],
  [2, 1],
  [2, 4],
  [2, 7],
  [2, 10],
  [2, 13],
  [2, 16],
];

export const findSeaMonstersOnOrientation = (
  filledInGrid: string[],
): [number, number][] => {
  const seaMonsters: [number, number][] = [];
  for (let r = 0; r < filledInGrid.length - 3; r++) {
    for (let c = 0; c < filledInGrid[0].length - 20; c++) {
      if (
        seaMonsterPattern.every((pattern) => {
          const [dr, dc] = pattern;
          return filledInGrid[r + dr][c + dc] === '#';
        })
      ) {
        seaMonsters.push([r, c]);
      }
    }
  }
  return seaMonsters;
};

export const findSeaMonsters = (
  filledInGrid: string[],
): { seaMonsterOrientedGrid: string[]; seaMonsters: [number, number][] } => {
  let seaMonsterOrientedGrid = [...filledInGrid];
  let seaMonsters = findSeaMonstersOnOrientation(seaMonsterOrientedGrid);
  let iters = 0;
  while (seaMonsters.length === 0 && iters < 12) {
    /* istanbul ignore next */
    if (iters === 3) {
      seaMonsterOrientedGrid = flipImageHorizontally(seaMonsterOrientedGrid);
    } else if (iters === 7) {
      seaMonsterOrientedGrid = flipImageVertically(seaMonsterOrientedGrid);
    } else {
      seaMonsterOrientedGrid = rotateImage90(seaMonsterOrientedGrid);
    }
    seaMonsters = findSeaMonstersOnOrientation(seaMonsterOrientedGrid);
    iters++;
  }
  return { seaMonsterOrientedGrid, seaMonsters };
};

export const removeSeaMonsters = (
  filledInGrid: string[],
  seaMonsters: [number, number][],
): string[] => {
  const newGrid = [...filledInGrid];
  seaMonsters.forEach((seaMonster) => {
    const [r, c] = seaMonster;
    seaMonsterPattern.forEach((pattern) => {
      const [dr, dc] = pattern;
      newGrid[r + dr] =
        newGrid[r + dr].substring(0, c + dc) +
        'O' +
        newGrid[r + dr].substring(c + dc + 1);
    });
  });
  return newGrid;
};

export const countHashes = (filledInGrid: string[]): number => {
  let result = 0;
  filledInGrid.forEach((row) => {
    [...row].forEach((value) => {
      if (value === '#') result++;
    });
  });
  return result;
};

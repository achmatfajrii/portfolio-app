"use client";

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
} from "react";

import gsap from "gsap";

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;

  cardDistance?: number;
  verticalDistance?: number;

  /**
   * Index card yang ingin berada paling depan.
   *
   * Dikontrol oleh parent.
   */
  activeIndex?: number;

  /**
   * Dipanggil ketika CardSwap selesai
   * berpindah ke card tertentu.
   */
  onActiveIndexChange?: (idx: number) => void;

  /**
   * Callback ketika card diklik langsung.
   */
  onCardClick?: (idx: number) => void;

  skewAmount?: number;

  easing?: "linear" | "elastic";

  children: ReactNode;
}

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<
  HTMLDivElement,
  CardProps
>(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`
      absolute
      top-1/2
      left-1/2
      rounded-xl
      border
      border-white
      [transform-style:preserve-3d]
      [will-change:transform]
      [backface-visibility:hidden]
      ${customClass ?? ""}
      ${rest.className ?? ""}
    `.trim()}
  />
));

Card.displayName = "Card";

type CardRef = RefObject<HTMLDivElement | null>;

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

/**
 * Membuat posisi setiap card.
 *
 * index 0 = paling depan
 * index 1 = card kedua
 * index 2 = card ketiga
 * dst.
 */
const makeSlot = (
  index: number,
  distanceX: number,
  distanceY: number,
  total: number
): Slot => ({
  x: index * distanceX,
  y: -index * distanceY,
  z: -index * distanceX * 1.5,
  zIndex: total - index,
});

/**
 * Menempatkan card secara langsung
 * tanpa animasi.
 */
const placeNow = (
  element: HTMLElement,
  slot: Slot,
  skew: number
) => {
  gsap.set(element, {
    x: slot.x,
    y: slot.y,
    z: slot.z,

    xPercent: -50,
    yPercent: -50,

    skewY: skew,

    transformOrigin: "center center",

    zIndex: slot.zIndex,

    force3D: true,
  });
};

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,

  cardDistance = 60,
  verticalDistance = 70,

  activeIndex = 0,

  onActiveIndexChange,
  onCardClick,

  skewAmount = 6,
  easing = "elastic",

  children,
}) => {
  /**
   * Konfigurasi animasi.
   */
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 1.2,
          durMove: 1.2,
          durReturn: 1.2,
          promoteOverlap: 0.75,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.7,
          durMove: 0.7,
          durReturn: 0.7,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  /**
   * Convert children menjadi array.
   */
  const childArr = useMemo(
    () =>
      Children.toArray(
        children
      ) as ReactElement<CardProps>[],
    [children]
  );

  /**
   * Ref setiap card.
   */
  const refs = useMemo<CardRef[]>(
    () =>
      childArr.map(() =>
        React.createRef<HTMLDivElement>()
      ),
    [childArr.length]
  );

  /**
   * order menentukan urutan card.
   *
   * Contoh:
   *
   * [0, 1, 2]
   *
   * berarti:
   *
   * 0 = depan
   * 1 = tengah
   * 2 = belakang
   *
   * Kalau project 3 dipilih:
   *
   * [2, 0, 1]
   */
  const order = useRef<number[]>([]);

  /**
   * Timeline aktif.
   */
  const timelineRef =
    useRef<gsap.core.Timeline | null>(null);

  /**
   * Mencegah animasi dijalankan
   * secara bersamaan.
   */
  const isAnimating =
    useRef(false);

  /**
   * Menempatkan seluruh card
   * berdasarkan order saat ini.
   */
  const positionCards = () => {
    const total = refs.length;

    if (total === 0) return;

    refs.forEach((ref, index) => {
      const element = ref.current;

      if (!element) return;

      const position =
        order.current.indexOf(index);

      if (position === -1) return;

      placeNow(
        element,
        makeSlot(
          position,
          cardDistance,
          verticalDistance,
          total
        ),
        skewAmount
      );
    });
  };

  /**
   * Memindahkan card tertentu
   * menjadi card paling depan.
   */
  const animateToIndex = (
    targetIndex: number
  ) => {
    const total = refs.length;

    if (total === 0) return;

    /**
     * Pastikan index valid.
     */
    if (
      targetIndex < 0 ||
      targetIndex >= total
    ) {
      return;
    }

    /**
     * Kalau sudah aktif,
     * tidak perlu animasi.
     */
    if (
      order.current[0] === targetIndex
    ) {
      return;
    }

    /**
     * Jangan menjalankan animasi
     * ketika animasi lain masih berjalan.
     */
    if (isAnimating.current) {
      return;
    }

    const targetPosition =
      order.current.indexOf(
        targetIndex
      );

    if (targetPosition === -1) {
      return;
    }

    const targetElement =
      refs[targetIndex].current;

    if (!targetElement) {
      return;
    }

    isAnimating.current = true;

    /**
     * Hentikan timeline sebelumnya
     * jika ada.
     */
    timelineRef.current?.kill();

    const currentOrder = [
      ...order.current,
    ];

    /**
     * Card yang dipilih menjadi paling depan.
     *
     * Contoh:
     *
     * current:
     * [0, 1, 2]
     *
     * target:
     * 2
     *
     * new:
     * [2, 0, 1]
     */
    const beforeTarget =
      currentOrder.slice(
        0,
        targetPosition
      );

    const afterTarget =
      currentOrder.slice(
        targetPosition + 1
      );

    const newOrder = [
      targetIndex,
      ...beforeTarget,
      ...afterTarget,
    ];

    const timeline =
      gsap.timeline({
        onComplete: () => {
          /**
           * Simpan order baru.
           */
          order.current =
            newOrder;

          /**
           * Pastikan posisi akhir
           * benar-benar presisi.
           */
          positionCards();

          isAnimating.current =
            false;

          /**
           * Beritahu parent bahwa
           * perpindahan selesai.
           */
          onActiveIndexChange?.(
            targetIndex
          );
        },
      });

    timelineRef.current =
      timeline;

    /**
     * Target card keluar terlebih dahulu.
     */
    timeline.to(
      targetElement,
      {
        y: "+=500",

        duration:
          config.durDrop,

        ease: config.ease,
      }
    );

    /**
     * Mulai mempromosikan card lain.
     */
    timeline.addLabel(
      "promote",
      `-=${
        config.durDrop *
        config.promoteOverlap
      }`
    );

    /**
     * Card lainnya bergerak
     * menuju posisi barunya.
     */
    const remaining =
      newOrder.slice(1);

    remaining.forEach(
      (index, position) => {
        const element =
          refs[index].current;

        if (!element) return;

        const slot =
          makeSlot(
            position + 1,
            cardDistance,
            verticalDistance,
            total
          );

        timeline.set(
          element,
          {
            zIndex:
              slot.zIndex,
          },
          "promote"
        );

        timeline.to(
          element,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,

            duration:
              config.durMove,

            ease: config.ease,
          },
          `promote+=${position * 0.12}`
        );
      }
    );

    /**
     * Target card masuk kembali
     * dari belakang menuju depan.
     */
    const frontSlot =
      makeSlot(
        0,
        cardDistance,
        verticalDistance,
        total
      );

    timeline.addLabel(
      "return",
      `promote+=${config.durMove * config.returnDelay}`
    );

    timeline.set(
      targetElement,
      {
        zIndex:
          frontSlot.zIndex,
      },
      "return"
    );

    timeline.to(
      targetElement,
      {
        x: frontSlot.x,
        y: frontSlot.y,
        z: frontSlot.z,

        duration:
          config.durReturn,

        ease: config.ease,
      },
      "return"
    );
  };

  /**
   * Initial setup.
   *
   * Hanya dijalankan ketika jumlah card berubah.
   */
  useEffect(() => {
    const total = refs.length;

    if (total === 0) {
      order.current = [];
      return;
    }

    /**
     * Pastikan activeIndex valid.
     */
    const normalizedIndex =
      Math.min(
        Math.max(
          activeIndex,
          0
        ),
        total - 1
      );

    /**
     * Card aktif diletakkan
     * sebagai card paling depan.
     */
    order.current = [
      normalizedIndex,

      ...Array.from(
        {
          length: total,
        },
        (_, index) => index
      ).filter(
        (index) =>
          index !==
          normalizedIndex
      ),
    ];

    /**
     * Hentikan animasi lama.
     */
    timelineRef.current?.kill();

    isAnimating.current =
      false;

    /**
     * Posisi awal.
     */
    positionCards();

    return () => {
      timelineRef.current?.kill();
    };
  }, [
    refs.length,
  ]);

  /**
   * Ketika activeIndex dari parent berubah,
   * CardSwap ikut berpindah.
   */
  useEffect(() => {
    if (refs.length === 0) {
      return;
    }

    /**
     * Kalau card yang diminta
     * sudah berada di depan,
     * tidak perlu melakukan apa-apa.
     */
    if (
      order.current[0] ===
      activeIndex
    ) {
      return;
    }

    animateToIndex(
      activeIndex
    );
  }, [
    activeIndex,
  ]);

  /**
   * Bersihkan animasi ketika unmount.
   */
  useEffect(() => {
    return () => {
      timelineRef.current?.kill();

      isAnimating.current =
        false;
    };
  }, []);

  /**
   * Render card.
   */
  const rendered =
    childArr.map(
      (child, index) => {
        if (
          !isValidElement<CardProps>(
            child
          )
        ) {
          return child;
        }

        return cloneElement(
          child,
          {
            key: child.key ?? index,

            ref: refs[index],

            style: {
              width,
              height,
              ...(child.props.style ??
                {}),
            },

            onClick: (event) => {
              /**
               * Jalankan onClick milik card
               * jika ada.
               */
              child.props.onClick?.(
                event as React.MouseEvent<HTMLDivElement>
              );

              /**
               * Klik langsung pada card
               * juga menjadikannya active.
               */
              animateToIndex(
                index
              );

              onCardClick?.(
                index
              );
            },
          } as CardProps &
            React.RefAttributes<HTMLDivElement>
        );
      }
    );

  return (
    <div
      className="
        absolute
        bottom-0
        right-0
        translate-x-[5%]
        translate-y-[10%]
        origin-bottom-right
        transform
        perspective-[900px]
        overflow-visible

        max-[768px]:translate-x-[25%]
        max-[768px]:translate-y-[25%]
        max-[768px]:scale-[0.75]

        max-[480px]:translate-x-[25%]
        max-[480px]:translate-y-[25%]
        max-[480px]:scale-[0.55]
      "
      style={{
        width,
        height,
      }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
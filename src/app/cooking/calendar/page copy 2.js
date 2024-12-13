"use client";

import { Header } from '../../components/index';
import { CookingNavBar } from '../../components/index';
import { DraggableImage } from '../../components/index';

import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaTrashAlt } from "react-icons/fa"; // ゴミ箱アイコンをインポート
import { useRouter } from 'next/navigation'; // useRouter をインポート
import { FaHeart } from "react-icons/fa"; // ハートアイコンをインポート

// メインのレシピデータ
const initialRecipeData = [
  { id: 1, title: "ふわっととろける！牛肉と玉ねぎのオムレツ炒め", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: true, src: "/images/dishes/dish1.jpg" },
  { id: 2, title: "シャキシャキ食感！香ばしいきんぴらごぼう", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish2.jpg" },
  { id: 3, title: "ほっこり幸せ！おふくろの味・肉じゃが", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish3.jpg" },
  { id: 4, title: "サクサク！鶏の唐揚げ", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish4.jpg" },
  { id: 5, title: "ふんわり卵の親子丼", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish5.jpg" },
  { id: 6, title: "具だくさん！野菜たっぷり味噌汁", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish6.jpg" },
  { id: 7, title: "さっぱり！さばの味噌煮", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish7.jpg" },
  { id: 8, title: "ジューシー！ハンバーグステーキ", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish8.jpg" },
  { id: 9, title: "あつあつ！肉豆腐", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish9.jpg" },
  { id: 10, title: "やみつき！ガーリックシュリンプ", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish10.jpg" },
  { id: 11, title: "ほくほく！かぼちゃの煮物", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish11.jpg" },
  { id: 12, title: "さっぱり！冷やし中華", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish12.jpg" },
  { id: 13, title: "ピリ辛！麻婆豆腐", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish13.jpg" },
  { id: 14, title: "クリーミー！カルボナーラ", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish14.jpg" },
  { id: 15, title: "さっぱり！冷製パスタ", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish15.jpg" },
  { id: 16, title: "濃厚！チーズフォンデュ", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish16.jpg" },
  { id: 17, title: "香ばしい！焼き魚", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish17.jpg" },
  { id: 18, title: "ふわふわ！パンケーキ", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish18.jpg" },
  { id: 19, title: "ジューシー！トンカツ", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish19.jpg" },
  { id: 20, title: "あっさり！お吸い物", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish20.jpg" },
  { id: 21, title: "濃厚！クリームシチュー", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish21.jpg" },
  { id: 22, title: "さっぱり！冷やしトマト", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish22.jpg" },
  { id: 23, title: "甘辛！照り焼きチキン", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish23.jpg" },
  { id: 24, title: "ふんわり！オムライス", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish24.jpg" },
  { id: 25, title: "香ばしい！焼きそば", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish25.jpg" },
  { id: 26, title: "あつあつ！グラタン", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish26.jpg" },
  { id: 27, title: "さっぱり！ポテトサラダ", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish27.jpg" },
  { id: 28, title: "濃厚！チョコレートケーキ", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish28.jpg" },
  { id: 29, title: "さっぱり！フルーツサラダ", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish29.jpg" },
  { id: 30, title: "あっさり！お茶漬け", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "/images/dishes/dish30.jpg" }
];

// ドラッグ＆ドロップ用のアイテムタイプを定義
const ItemTypes = {
  IMAGE: "image",
};

export default function CalendarPage() {
  const router = useRouter();

  const [recipeData, setRecipeData] = useState(initialRecipeData);

  const initialCalendarData = recipeData
    .filter(item => item.onCalendar)
    .reduce((acc, item) => {
      acc[item.calendarDate] = item.src;
      return acc;
    }, {});
  const [calendarData, setCalendarData] = useState(initialCalendarData);

  const candidates = recipeData.filter(item => item.onCandidate).map(item => ({
    id: item.id,
    src: item.src,
    onFavorite: item.onFavorite,
    isFavorite: item.onFavorite
  }));

  const favorites = recipeData.filter(item => item.onFavorite).map(item => ({
    id: item.id,
    src: item.src,
    onFavorite: item.onFavorite,
    isFavorite: item.onFavorite
  }));

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const CalendarCell = ({ date, imageSrc, onDropImage, onDeleteImage, isSunday, isSaturday }) => {
    const [, drop] = useDrop(() => ({
      accept: ItemTypes.IMAGE,
      drop: (item) => onDropImage(date, item.src),
    }));

    const handleDoubleClick = (id) => {
      router.push(`/cooking/suggestion/${id}`);
    };

    return (
      <div
        ref={drop}
        className={`border rounded-lg h-24 flex flex-col items-center justify-center relative ${
          date === "18" ? "bg-orange-100" : "" // 18日だけオレンジ色を適用
        }`}
      >
        <div
          className={`absolute top-1 left-1 text-xs ${
            isSunday ? "text-red-500" : isSaturday ? "text-blue-500" : "text-black"
          }`}
        >
          {date}
        </div>
        {imageSrc ? (
          <div className="relative mt-2">
            <img
              src={imageSrc}
              alt={`Dish for ${date}`}
              className="w-16 h-16 rounded-lg"
              onDoubleClick={() => handleDoubleClick(recipeData.find(item => item.src === imageSrc)?.id)}
            />

            {/* ゴミ箱ボタン */}
            <button
              onClick={() => onDeleteImage(date, imageSrc)}
              className="absolute bottom-0 right-0 text-gray-300 p-1"
            >
              <FaTrashAlt />
            </button>

            {/* ハートボタン */}
            <button
              onClick={() => toggleFavorite(imageSrc)}
              className="absolute top-0 right-0 text-red-500 p-1"
            >
              <FaHeart
                className={
                  recipeData.find((item) => item.src === imageSrc)?.onFavorite
                    ? "text-red-500"
                    : "text-gray-400"
                }
              />
            </button>


          </div>
        ) : (
          <div className="w-16 h-16   flex items-center justify-center text-xs text-gray-400">
            -
          </div>
        )}
      </div>
    );
  };

  const handleDropImage = (date, src) => {
    setCalendarData((prev) => ({
      ...prev,
      [date]: src,
    }));

    setRecipeData((prevData) =>
      prevData.map((item) => {
        if (item.src === src) {
          return {
            ...item,
            onCalendar: true,
            calendarDate: date,
          };
        }
        return item;
      })
    );
  };

  // ハートマークを切り替える関数
  const toggleFavorite = (src) => {
    setRecipeData((prevData) =>
      prevData.map((item) => {
        if (item.src === src) {
          return { ...item, onFavorite: !item.onFavorite };
        }
        return item;
      })
    );
  };

  //ここから画像削除3兄弟
  //(1)カレンダーから画像削除→Candidateへ
  const handleDeleteImage = (date, imageSrc) => {
    setCalendarData((prev) => {
      const newData = { ...prev };
      delete newData[date];
      return newData;
    });

    setRecipeData((prevData) => 
      prevData.map((item) => {
        if (item.src === imageSrc) {
          return {
            ...item,
            onCalendar: false,
            onCandidate: true,
          };
        }
        return item;
      })
    );
  };

  //(2)Candidateの画像削除
  const handleDeleteFromCandidate = (src) => {
    setRecipeData((prevData) =>
      prevData.map((item) => {
        if (item.src === src) {
          return { ...item, onCandidate: false };
        }
        return item;
      })
    );
  };

  //(3)Favoriteの画像削除
  const handleDeleteFromFavorite = (src) => {
    setRecipeData((prevData) =>
      prevData.map((item) => {
        if (item.src === src) {
          return { ...item, onFavorite: false };
        }
        return item;
      })
    );
  };
  


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <CookingNavBar />

        {/* カレンダーセクション */}
        <section className="white-container">
          <h2 className="text-lg font-bold mb-4">2024 December</h2>
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {daysOfWeek.map((day, index) => (
              <div
                key={index}
                className={`py-2 font-bold text-white ${
                  index === 0
                    ? "bg-red-500" // 日曜日: 赤
                    : index === 6
                    ? "bg-blue-500" // 土曜日: 青
                    : "bg-gray-500" // 平日: 灰色
                }`}
              >
                {day}
              </div>
            ))}
            {Array.from({ length: 31 + new Date(2024, 11, 1).getDay() }, (_, i) => {
              if (i < new Date(2024, 11, 1).getDay()) {
                return <div key={i}></div>;
              }
              const date = (i - new Date(2024, 11, 1).getDay() + 1).toString();
              const dayOfWeek = (i % 7);
              return (
                <CalendarCell
                  key={date}
                  date={date}
                  imageSrc={calendarData[date]}
                  onDropImage={handleDropImage}
                  onDeleteImage={handleDeleteImage}
                  isSunday={dayOfWeek === 0}
                  isSaturday={dayOfWeek === 6}
                />
              );
            })}
          </div>
        </section>
          
        {/* Candidateセクション */}
        <section className="white-container mt-6">
          <h2 className="text-lg font-bold mb-4">Candidate</h2>
          <div className="flex space-x-4">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="flex items-center justify-center">
                <DraggableImage
                  id={candidate.id}
                  src={candidate.src}
                  onDelete={() => handleDeleteFromCandidate(candidate.src)}
                  onFavorite={() => toggleFavorite(candidate.src)} // toggleFavorite を渡す
                  isFavorite={candidate.isFavorite}                  
                />
                
              </div>
            ))}
          </div>
        </section>
        
        {/* Favoriteセクション */}
        <section className="white-container mt-6">
          <h2 className="text-lg font-bold mb-4">Favorite</h2>
          <div className="flex space-x-4">
            {favorites.map((favorite) => (
              <div key={favorite.id} className="relative flex items-center justify-center">
                <DraggableImage 
                  id={favorite.id} 
                  src={favorite.src} 
                  onDelete={() => handleDeleteFromFavorite(favorite.src)}
                  onFavorite={() => toggleFavorite(favorite.src)} // toggleFavorite を渡す
                  isFavorite={favorite.isFavorite}  
                />

              </div>
            ))}
          </div>
        </section>

      </div>
    </DndProvider>
  );
}

const IconCross =
    '<g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M18 6L6 18M6 6l12 12"></path></path></g>';

const CharacterA =
    '<path fill="none" d="M9 15 L12 9 L15 15 M10 13.5 h3" stroke="currentColor" stroke-width=".125em"/>';

export default {
    // generic
    labelReset: 'Сброс',
    labelDefault: 'По умолчанию',
    labelAuto: 'Авто',
    labelNone: 'Нет',
    labelEdit: 'Изменить',
    labelClose: 'Закрыть',
    labelSupportError: (features) => `${features.join(', ')} не поддерживается в этом браузере`,

    // defaults
    labelColor: 'Цвет',
    labelWidth: 'Ширина',
    labelSize: 'Размер',
    labelOffset: 'Смещение',
    labelAmount: 'Количество',
    labelInset: 'Вставка',
    labelRadius: 'Радиус',

    // sizes
    labelSizeExtraSmall: 'Очень маленький',
    labelSizeSmall: 'Маленький',
    labelSizeMedium: 'Средний',
    labelSizeMediumSmall: 'Средний-маленький',
    labelSizeMediumLarge: 'Средний-большой',
    labelSizeLarge: 'Большой',
    labelSizeExtraLarge: 'Очень большой',

    // unused?
    labelButtonRevert: 'Вернуть',
    labelButtonCancel: 'Отмена',

    labelButtonUndo: 'Возврат',
    labelButtonRedo: 'Повтор',
    labelButtonExport: 'Готово',

    iconSupportError: `<g fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><g><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></g>`,
    iconButtonClose: IconCross,
    iconButtonRevert: `<g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M7.388 18.538a8 8 0 10-2.992-9.03"/><path fill="currentColor" d="M2.794 11.696L2.37 6.714l5.088 3.18z"/><path d="M12 8v4M12 12l4 2"/></g>`,
    iconButtonUndo: `<g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M10 8h4c2.485 0 5 2 5 5s-2.515 5-5 5h-4"/><path fill="currentColor" d="M5 8l4-3v6z"/></g>`,
    iconButtonRedo: `<g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M14 8h-4c-2.485 0-5 2-5 5s2.515 5 5 5h4"/><path fill="currentColor" d="M19 8l-4-3v6z"/></g>`,
    iconButtonExport: `<polyline points="20 6 9 17 4 12" fill="none" stroke="currentColor" stroke-width=".125em"></polyline>`,

    // status
    statusLabelButtonClose: 'Закрыть',
    statusIconButtonClose: IconCross,
    statusLabelLoadImage: (state) => {
        if (!state || !state.task) return 'Ожидание изображения';
        if (state.error)
            return state.error.code === 'IMAGE_TOO_SMALL'
                ? 'Минимальный размер: {minWidth} × {minHeight}'
                : 'Ошибка загрузки изображения';
        if (state.task === 'blob-to-bitmap') return 'Создание предпросмотра…';
        return 'Загрузка изображения…';
    },

    // processing status message
    statusLabelProcessImage: (state) => {
        if (!state || !state.task) return undefined;
        if (state.task === 'store') {
            if (state.error) return 'Ошибка загрузки изображения';
            return 'Загрузка изображения…';
        }
        if (state.error) return 'Ошибка обработки изображения';
        return 'Обработка изображения…';
    },
};

export const MarkupEditor = {
    shapeLabelButtonSelectSticker: 'Выбрать изображение',
    shapeIconButtonSelectSticker: `<g fill="none" stroke="currentColor" stroke-width="0.0625em"><path d="M8 21 L15 11 L19 15"/><path d="M15 2 v5 h5"/><path d="M8 2 h8 l4 4 v12 q0 4 -4 4 h-8 q-4 0 -4 -4 v-12 q0 -4 4 -4z"/></g><circle fill="currentColor" cx="10" cy="8" r="1.5"/>`,

    shapeIconButtonFlipHorizontal: `<g stroke="currentColor" stroke-width=".125em"><path fill="none" d="M6 6.5h5v11H6z"/><path fill="currentColor" d="M15 6.5h3v11h-3z"/><path d="M11 4v16" fill="currentColor"/></g>`,
    shapeIconButtonFlipVertical: `<g stroke="currentColor" stroke-width=".125em"><rect x="7" y="8" width="11" height="5" fill="none"/><rect x="7" y="17" width="11" height="2" fill="currentColor"/><line x1="5" y1="13" x2="20" y2="13"/></g>`,
    shapeIconButtonRemove: `<g fill="none" fill-rule="evenodd"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M7.5 7h9z"/><path d="M7.916 9h8.168a1 1 0 01.99 1.14l-.972 6.862a2 2 0 01-1.473 1.653c-.877.23-1.753.345-2.629.345-.876 0-1.752-.115-2.628-.345a2 2 0 01-1.473-1.653l-.973-6.862A1 1 0 017.916 9z" fill="currentColor"/><rect fill="currentColor" x="10" y="5" width="4" height="3" rx="1"/></g>`,
    shapeIconButtonDuplicate: `<g fill="none" fill-rule="evenodd"><path d="M15 13.994V16a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2h2.142" stroke="currentColor" stroke-width=".125em"/><path d="M15 9V8a1 1 0 00-2 0v1h-1a1 1 0 000 2h1v1a1 1 0 002 0v-1h1a1 1 0 000-2h-1zm-4-4h6a2 2 0 012 2v6a2 2 0 01-2 2h-6a2 2 0 01-2-2V7a2 2 0 012-2z" fill="currentColor"/></g>`,
    shapeIconButtonMoveToFront: `<g fill="none" fill-rule="evenodd"><rect fill="currentColor" x="11" y="13" width="8" height="2" rx="1"/><rect fill="currentColor" x="9" y="17" width="10" height="2" rx="1"/><path d="M11.364 8H10a5 5 0 000 10M12 6.5L14.5 8 12 9.5z" stroke="currentColor" stroke-width=".125em" stroke-linecap="round"/></g>`,

    shapeIconButtonTextLayoutAutoWidth: `${CharacterA}`,
    shapeIconButtonTextLayoutAutoHeight: `<g fill="currentColor"><circle cx="4" cy="12" r="1.5"/><circle cx="20" cy="12" r="1.5"/></g>${CharacterA}`,
    shapeIconButtonTextLayoutFixedSize: `<g fill="currentColor"><circle cx="5" cy="6" r="1.5"/><circle cx="19" cy="6" r="1.5"/><circle cx="19" cy="19" r="1.5"/><circle cx="5" cy="19" r="1.5"/></g>${CharacterA}`,

    shapeTitleButtonTextLayoutAutoWidth: 'Автоширина',
    shapeTitleButtonTextLayoutAutoHeight: 'Автовысота',
    shapeTitleButtonTextLayoutFixedSize: 'Фиксированный размер',

    shapeTitleButtonFlipHorizontal: 'Отразить по горизонтали',
    shapeTitleButtonFlipVertical: 'Отразить по вертикали',
    shapeTitleButtonRemove: 'Убрать',
    shapeTitleButtonDuplicate: 'Дублировать',
    shapeTitleButtonMoveToFront: 'Переместить вперед',

    shapeLabelInputText: 'Изменить текст',

    shapeIconInputCancel: `<g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M18 6L6 18M6 6l12 12"/></g>`,
    shapeIconInputConfirm: `<g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><polyline points="20 6 9 17 4 12"/></g>`,
    shapeLabelInputCancel: 'Отмена',
    shapeLabelInputConfirm: 'Подтвердить',

    shapeLabelStrokeNone: 'Нет контура',

    shapeLabelFontStyleNormal: 'Обычный',
    shapeLabelFontStyleBold: 'Жирный',
    shapeLabelFontStyleItalic: 'Курсив',
    shapeLabelFontStyleItalicBold: 'Жирный курсив',

    shapeTitleBackgroundColor: 'Цвет заливки',

    shapeTitleFontFamily: 'Шрифт',
    shapeTitleFontSize: 'Размер шрифта',
    shapeTitleFontStyle: 'Стиль шрифта',
    shapeTitleLineHeight: 'Интерлиньяж',

    shapeTitleLineStart: 'Начало',
    shapeTitleLineEnd: 'Конец',
    shapeTitleStrokeWidth: 'Ширина линии',
    shapeTitleStrokeColor: 'Цвет линии',

    shapeTitleLineDecorationBar: 'Полоса',
    shapeTitleLineDecorationCircle: 'Круг',
    shapeTitleLineDecorationSquare: 'Квадрат',
    shapeTitleLineDecorationArrow: 'Стрелка',
    shapeTitleLineDecorationCircleSolid: 'Цветной круг',
    shapeTitleLineDecorationSquareSolid: 'Цветной квадрат',
    shapeTitleLineDecorationArrowSolid: 'Цветная стрелка',

    shapeIconLineDecorationBar: `<g stroke="currentColor" stroke-linecap="round" stroke-width=".125em"><path d="M5,12 H16"/><path d="M16,8 V16"/></g>`,
    shapeIconLineDecorationCircle: `<g stroke="currentColor" stroke-linecap="round"><path stroke-width=".125em" d="M5,12 H12"/><circle fill="none" stroke-width=".125em" cx="16" cy="12" r="4"/></g>`,
    shapeIconLineDecorationSquare: `<g stroke="currentColor" stroke-linecap="round"><path stroke-width=".125em" d="M5,12 H12"/><rect fill="none" stroke-width=".125em" x="12" y="8" width="8" height="8"/></g>`,
    shapeIconLineDecorationArrow: `<g stroke="currentColor" stroke-linecap="round" stroke-width=".125em"><path d="M5,12 H16 M13,7 l6,5 l-6,5" fill="none"/></g>`,
    shapeIconLineDecorationCircleSolid: `<g stroke="currentColor" stroke-linecap="round"><path stroke-width=".125em" d="M5,12 H12"/><circle fill="currentColor" cx="16" cy="12" r="4"/></g>`,
    shapeIconLineDecorationSquareSolid: `<g stroke="currentColor" stroke-linecap="round"><path stroke-width=".125em" d="M5,12 H12"/><rect fill="currentColor" x="12" y="8" width="8" height="8"/></g>`,
    shapeIconLineDecorationArrowSolid: `<g stroke="currentColor" stroke-linecap="round" stroke-width=".125em"><path d="M5,12 H16"/><path d="M13,7 l6,5 l-6,5z" fill="currentColor"/></g>`,

    shapeTitleColorTransparent: 'Прозрачно',
    shapeTitleColorWhite: 'Белый',
    shapeTitleColorSilver: 'Серебристый',
    shapeTitleColorGray: 'Серый',
    shapeTitleColorBlack: 'Черный',
    shapeTitleColorNavy: 'Темно-синий',
    shapeTitleColorBlue: 'Синий',
    shapeTitleColorAqua: 'Голубой',
    shapeTitleColorTeal: 'Бирюзовый',
    shapeTitleColorOlive: 'Оливковый',
    shapeTitleColorGreen: 'Зеленый',
    shapeTitleColorYellow: 'Желтый',
    shapeTitleColorOrange: 'Оранжевый',
    shapeTitleColorRed: 'Красный',
    shapeTitleColorMaroon: 'Каштановый',
    shapeTitleColorFuchsia: 'Фуксия',
    shapeTitleColorPurple: 'Фиолетовый',

    shapeTitleTextColor: 'Цвет шрифта',
    shapeTitleTextAlign: 'Выравнивание текста',
    shapeTitleTextAlignLeft: 'Выровнять текст по левому краю',
    shapeTitleTextAlignCenter: 'Выровнять текст по центру',
    shapeTitleTextAlignRight: 'Выровнять текст по правому краю',

    shapeIconTextAlignLeft: `<g stroke-width=".125em" stroke="currentColor"><line x1="5" y1="8" x2="15" y2="8"/><line x1="5" y1="12" x2="19" y2="12"/><line x1="5" y1="16" x2="14" y2="16"/></g>`,
    shapeIconTextAlignCenter: `<g stroke-width=".125em" stroke="currentColor"><line x1="7" y1="8" x2="17" y2="8"/><line x1="5" y1="12" x2="19" y2="12"/><line x1="8" y1="16" x2="16" y2="16"/></g>`,
    shapeIconTextAlignRight: `<g stroke-width=".125em" stroke="currentColor"><line x1="9" y1="8" x2="19" y2="8"/><line x1="5" y1="12" x2="19" y2="12"/><line x1="11" y1="16" x2="19" y2="16"/></g>`,

    shapeLabelToolSharpie: 'Маркер',
    shapeLabelToolEraser: 'Ластик',
    shapeLabelToolRectangle: 'Прямоугольник',
    shapeLabelToolEllipse: 'Эллипс',
    shapeLabelToolArrow: 'Стрелка',
    shapeLabelToolLine: 'Линия',
    shapeLabelToolText: 'Текст',
    shapeLabelToolPreset: 'Стикеры',

    shapeIconToolSharpie: `<g stroke-width=".125em" stroke="currentColor" fill="none"><path d="M2.025 5c5.616-2.732 8.833-3.857 9.65-3.374C12.903 2.351.518 12.666 2.026 14 3.534 15.334 16.536.566 17.73 2.566 18.924 4.566 3.98 17.187 4.831 18c.851.813 9.848-6 11.643-6 1.087 0-2.53 5.11-2.92 7-.086.41 3.323-1.498 4.773-1 .494.17.64 2.317 1.319 3 .439.443 1.332.776 2.679 1" stroke="currentColor" stroke-width=".125em" fill="none" fill-rule="evenodd" stroke-linejoin="round"/></g>`,
    shapeIconToolEraser: `<g stroke-width=".125em" stroke="currentColor" stroke-linecap="round" fill="none"><g transform="translate(3, 15) rotate(-45)"><rect x="0" y="0" width="18" height="10" rx="3"/></g><line x1="11" y1="21" x2="18" y2="21"/><line x1="20" y1="21" x2="22" y2="21"/></g>`,
    shapeIconToolRectangle: `<g stroke-width=".125em" stroke="currentColor" fill="none"><rect x="2" y="2" width="20" height="20" rx="3"/></g>`,
    shapeIconToolEllipse: `<g stroke-width=".125em" stroke="currentColor" fill="none"><circle cx="12" cy="12" r="11"/></g>`,
    shapeIconToolArrow: `<g stroke-width=".125em" stroke="currentColor" fill="none"><line x1="20" y1="3" x2="6" y2="21"/><path d="m10 5 L22 1 L21 13" fill="currentColor" stroke="none"/></g>`,
    shapeIconToolLine: `<g stroke-width=".125em" stroke="currentColor" fill="none"><line x1="20" y1="3" x2="6" y2="21"/></g>`,
    shapeIconToolText: `<g stroke="none" fill="currentColor" transform="translate(6,0)"><path d="M8.14 20.085c.459 0 .901-.034 1.329-.102a8.597 8.597 0 001.015-.21v1.984c-.281.135-.695.247-1.242.336a9.328 9.328 0 01-1.477.133c-3.312 0-4.968-1.745-4.968-5.235V6.804H.344v-1.25l2.453-1.078L3.89.819h1.5v3.97h4.97v2.015H5.39v10.078c0 1.031.245 1.823.735 2.375s1.161.828 2.015.828z"/>`,
    shapeIconToolPreset: `<g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M12 22c2.773 0 1.189-5.177 3-7 1.796-1.808 7-.25 7-3 0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10z"></path><path d="M20 17c-3 3-5 5-8 5"></path></g>`,
};

// deprecated
export const ShapeEditor = MarkupEditor;

const { encodeHTML, FlexLayout } = require('./utils');

const themes = require('./themes');

const wrap = require('word-wrap');

function getStyle(
	theme = 'default',
	options = { charWidth1: 11, charWidth2: 9 }
) {
	return `
	@import url("https://fonts.googleapis.com/css?family=Raleway:600");
	@import url("https://fonts.googleapis.com/css?family=Sansita+Swashed:600");
	.title{
		font-family: "Sansita Swashed", cursive;
		font-weight: 600;
		font-size: ${(options.charWidth1 / 7.5).toFixed(3)}rem;
		text-align: justify;
		fill: ${themes[theme].title_color};
	}
	.author{
		font-size: ${(options.charWidth2 / 7.5).toFixed(3)}rem;
		font-family: "Raleway", sans-serif;
        fill: ${themes[theme].text_color};
	}
	`;
}
class QuoteCard {
	constructor(
		width = 512,
		height = 512,
		theme = 'default',
		quoteTitle = 'Quote',
		quoteAuthor = 'Author'
	) {
		this.width = width;
		this.height = height;

		this.paddingX = 25;
		this.paddingY = 35;

		const titleWidth = Math.ceil((this.width - 2 * this.paddingX) / 11);
		this.title = wrap(quoteTitle, {
			width: titleWidth,
		})
			.split('\n')
			.map((e) => encodeHTML(e.trim()));

		this.author = encodeHTML('— ' + quoteAuthor);

		this.theme = theme;
		this.css = '';
		this.calculate();
	}

	setCSS(value) {
		this.css = value;
	}

	calculate() {
		this.titleText = [
			`
            <text
                x="0"
                y="0"
                class="title"
                data-testid="header"
            >“ ${this.title[0]}</text>
        `,
		];

		for (let i = 1; i < this.title.length; i++)
			this.titleText.push(`
                <text
                    x="0"
                    y="0"
                    class="title"
                    data-testid="header"
                >${this.title[i]}</text>
            `);
		this.authorText = [
			'<text></text>',
			`
            <text
                x="0"
                y="0"
                class="author"
            >${this.author}</text>
        `,
		];

		this.lineheight = 27;
		this.paddingY =
			(this.height -
				(this.authorText.length + this.titleText.length) * this.lineheight) /
				2 +
			11;
		this.setCSS(getStyle(this.theme), {
			charWidth1: 11,
			charWidth2: 9,
		});
	}

	renderTitle() {
		return `
            <g
            transform="translate(${this.paddingX}, ${this.paddingY})"
            >
            ${FlexLayout({
							items: [...this.titleText],
							gap: this.lineheight,
							direction: 'column',
						}).join('')}
            </g>
            <g
            transform="translate(${
							this.width - Math.ceil(this.author.length * 9) - this.paddingX
						}, ${this.paddingY + this.titleText.length * this.lineheight})"
            >
            ${FlexLayout({
							items: [...this.authorText],
							gap: this.lineheight,
							direction: 'column',
						}).join('')}
            </g>
        `;
	}

	render() {
		return `
            <svg 
                width="${this.width}" 
                height="${this.height}"
                viewBox="0 0 ${this.width} ${this.height}" 
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >

                <style>
                ${this.css}
                </style>

                <rect
                    x="0.5"
                    y="0.5"
                    rx="4.5"
                    height="99%"
                    stroke="#E4E2E2"
                    width="${this.width - 1}"
                    fill="${themes[this.theme].bg_color}"
                    stroke-opacity="${this.hideBorder ? 0 : 1}"
                />

                ${this.renderTitle()}
            </svg>`;
	}
}

async function getCard(title = 'Quote', author = 'Author', theme = 'default') {
	const card = new QuoteCard(512, 256, theme, title, author);
	return card.render();
}

module.exports = { QuoteCard, getCard };

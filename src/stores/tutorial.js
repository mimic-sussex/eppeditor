import { writable, readable, get } from "svelte/store";

import { id, fetchFrom } from "../utils/utils";
// import { storable } from "../stores/common";

import gridHelp from "svelte-grid/build/helper/index.mjs";

import ModelEditor from "../components/editors/ModelEditor.svelte";
import GrammarEditor from "../components/editors/GrammarEditor.svelte";
import LiveCodeEditor from "../components/editors/LiveCodeEditor.svelte";
import LiveCodeParseOutput from "../components/widgets/LiveCodeParseOutput.svelte";
import GrammarCompileOutput from "../components/widgets/GrammarCompileOutput.svelte";
import Analyser from "../components/widgets/Analyser.svelte";
import StoreInspector from "../components/widgets/StoreInspector.svelte";
import DSPCode from '../components/widgets/DSPCode.svelte'
import Console from "../components/widgets/Console.svelte";

let liveCode = "";
let modelCode = "";
let grammarCode = "";

// overlay for when engine is loading up
export const isLoadingOverlayInTutorialVisible = writable(false);

/*******                                        ********/
/*******                                        ********/
/*******   Tutorial Language Design Stores    ********/
/*******                                        ********/

// export const grammarEditorValue = writable(initGrammarEditorValue());
export const grammarEditorValue = writable("");

// export const grammarCompiledParser = writable(compile(default_grammar).output);
export const grammarCompiledParser = writable("");

export const grammarCompilationErrors = writable("");

// export const liveCodeEditorValue = writable(initLiveCodeEditorValue());
export const liveCodeEditorValue = writable("");

export const liveCodeParseResults = writable("");

export const liveCodeParseErrors = writable("");

export const liveCodeAbstractSyntaxTree = writable("");

export const dspCode = writable("");

// TFJS Model editor value, and IO channels' values

// export const modelEditorValue = writable(initModelEditorValue());
export const modelEditorValue = writable("");

/*******                                        ********/
/*******     Tutorial Language Design Stores    ********/
/*******                                        ********/
/*******                                        ********/
/*******                                        ********/
/*******                                        ********/
/*******                                        ********/
/*******                                        ********/
/*******                                        ********/
/*******                                        ********/
/*******                                        ********/
/*******     Tutorial Dashboard Items Stores    ********/
/*******                                        ********/



const originalItems = [
	{
		...gridHelp.item({ x: 0, y: 0, w: 6, h: 7, id: id() }),
		...{
			type: "liveCodeEditor",
			name: "hello-world",
			background: "#151515",
			lineNumbers: true,
			hasFocus: false,
			background: "#151515",
			theme: "icecoder",
			component: LiveCodeEditor,
			data: liveCode,
			grammarSource: "/languages/default/grammar.ne",
		},
	},

	{
		...gridHelp.item({ x: 6, y: 0, w: 3, h: 2, id: id() }),
		...{
			name: "hello world",
			type: "analyser",
			lineNumbers: true,
			hasFocus: false,
			theme: "monokai",
			background: "#f0f0f0",
			component: Analyser,
			mode: "both",
		},
	},

	{
		...gridHelp.item({ x: 9, y: 0, w: 18, h: 3, id: id() }),
		...{
			name: "hello world",
			type: "modelEditor",
			lineNumbers: true,
			hasFocus: false,
			theme: "monokai",
			background: "#f0f0f0",
			component: ModelEditor,
			data: modelCode,
		},
	},

	{
		...gridHelp.item({ x: 6, y: 2, w: 3, h: 5, id: id() }),
		...{
			name: "hello world",
			type: "liveCodeParseOutput",
			lineNumbers: false,
			hasFocus: false,
			theme: "shadowfox",
			background: "#ebdeff",
			component: LiveCodeParseOutput,
			data: "",
		},
	},

	{
		...gridHelp.item({ x: 9, y: 3, w: 15, h: 3, id: id() }),
		...{
			name: "hello world",
			type: "grammarEditor",
			lineNumbers: true,
			hasFocus: false,
			theme: "monokai",
			background: "#AAAAAA",
			component: GrammarEditor,
			data: grammarCode,
		},
	},

	{
		...gridHelp.item({ x: 7, y: 7, w: 4, h: 30, id: id() }),
		...{
			name: "hello world",
			type: "storeInspector",
			lineNumbers: true,
			hasFocus: false,
			theme: "monokai",
			background: "#f0f0f0",
			component: StoreInspector,
			data: "",
		},
	},

	{
		...gridHelp.item({ x: 9, y: 6, w: 18, h: 1, id: id() }),
		...{
			name: "hello world",
			type: "grammarCompileOutput",
			lineNumbers: true,
			hasFocus: false,
			theme: "monokai",
			background: "#d1d5ff",
			component: GrammarCompileOutput,
			data: "",
		},
	},
];

const testItems = [
	{
		...gridHelp.item({ x: 7, y: 0, w: 2, h: 1, id: id() }),
		...{
			type: "liveCodeEditor",
			name: "hello-world",
			background: "#151515",
			lineNumbers: true,
			hasFocus: false,
			background: "#151515",
			theme: "icecoder",
			component: LiveCodeEditor,
			data: "#lc-1",
			grammarSource: "/languages/default/grammar.ne"
		},
	},

	{
		...gridHelp.item({ x: 10, y: 2, w: 2, h: 1, id: id() }),
		...{
			name: "hello world",
			type: "grammarEditor",
			lineNumbers: true,
			hasFocus: false,
			theme: "monokai",
			background: "#AAAAAA",
			component: GrammarEditor,
			data: "#g-1",
		},
	},

	{
		...gridHelp.item({ x: 0, y: 4, w: 3, h: 1, id: id() }),
		...{
			name: "hello world",
			type: "modelEditor",
			lineNumbers: true,
			hasFocus: false,
			theme: "monokai",
			background: "#f0f0f0",
			component: ModelEditor,
			data: "//m-1\nsema.env.saveLocal('1')",
		},
	},

	{
		...gridHelp.item({ x: 0, y: 8, w: 1, h: 1, id: id() }),
		...{
			name: "hello world",
			type: "analyser",
			lineNumbers: true,
			hasFocus: false,
			theme: "monokai",
			background: "#f0f0f0",
			component: Analyser,
			mode: "spectrogram",
			data: "1",
		},
	},
];

// Store for tutorial options in Sidebar component
let tutorialOptions = [
	{
		id: 1,
		text: `Tutorial 1`,
		sections: [
			{
				slug: "basics",
				title: "Basics",
				chapter_dir: "01-basics",
				section_dir: "01-introduction",
			},
			{
				slug: "layout",
				title: "Layout",
				chapter_dir: "01-basics",
				section_dir: "02-layout",
			},
			{
				slug: "editors",
				title: "Editors",
				chapter_dir: "01-basics",
				section_dir: "03-editors",
			},
			{
				slug: "widgets",
				title: "Widgets",
				chapter_dir: "01-basics",
				section_dir: "04-widgets",
			},
		],
	},
];

export const populateStoresWithFetchedProps = async (newItem) => {
	if (newItem.type === "liveCodeEditor")
		try {
			newItem.data = await fetchFrom(newItem.liveCodeSource);
			liveCodeEditorValue.set(newItem.data);
			let grammar = await fetchFrom(newItem.grammarSource);
			grammarEditorValue.set(grammar);
			let compileOutput = compile(grammar).output;
			grammarCompiledParser.set(compileOutput);
		} catch (error) {
			console.error("Error Populating stores with fetched liveCode props");
		}
};

export function hydrateJSONcomponent (item){
	if (
		item !== "undefined" &&
		item.data !== "undefined" &&
		item.data.type !== "undefined"
	) {
		switch (item.data.type) {
			case 'liveCodeEditor':
				item.data.component = LiveCodeEditor
				break
			case 'grammarEditor':
				item.data.component = GrammarEditor
				break
			case 'modelEditor':
				item.data.component = ModelEditor
				break
			case 'liveCodeParseOutput':
				item.data.component = LiveCodeParseOutput
				break
			case 'grammarCompileOutput':
				item.data.component = GrammarCompileOutput
				break
			case 'storeInspector':
				item.data.component = StoreInspector
				break
			case 'analyser':
				item.data.component = Analyser
				break
			case 'console':
				item.data.component = Console
				break
			case 'dspCode':
				item.data.component = DSPCode
				break
			default:
				// item.component = StoreInspector;
				break
		}
		if (item.id !== "undefined") {
			item.id = id();
			item.data.name = item.name + item.id;
		}
		return item;
	} else throw Error("hydrateJSONcomponent: undefined item");
	// } else {
	// 	createNewItem();
	// }
};

/*
 * Wraps writable store a
 */
export function storable(key, initialValue, hydrateComponents) {
	const store = writable(initialValue); // create an underlying store
	const { subscribe, set, update } = store;

	let json = localStorage.getItem(key); // get the last value from localStorage
	if (json && hydrateComponents) {
		set(JSON.parse(json).map((item) => hydrateJSONcomponent(item))); // use the value from localStorage if it exists
	}
	else if (json)
    set( JSON.parse(json));

	// return an object with the same interface as Svelte's writable() store interface
		return {
			set(value) {
				localStorage.setItem(key, JSON.stringify(value));
				set(value); // capture set and write to localStorage
			},

			update(cb) {
				const value = cb(get(store)); // passes items to callback for invocation e.g items => items.concat(new)
				this.set(value); // capture updates and write to localStore
			},

			get() {
				return localStorage.getItem(key);
			},

			subscribe, // punt subscriptions to underlying store
		};
}



export let tutorials = writable(tutorialOptions);
// export let tutorials = writable([]);

// Store for SELECTED tutorial options in Sidebar component
export let selected = writable({});
export let selectedChapter = writable({});
export let selectedSection = writable({})
// export let selected = storable("selectedTutorial", {}, false) ;

export let items = writable(testItems); // localStorageWrapper
// export let items = storable("tutorial", testItems, true); // localStorageWrapper

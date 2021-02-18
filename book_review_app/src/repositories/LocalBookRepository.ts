// Copyright 2021 Markus Kapp & Jonas Nelson
// LocalRepository.ts
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Verantwortlich: Markus Kapp
// Mitwirkend: Jonas Nelson

import BookRepositoryInterface from "@/repositories/BookRepositoryInterface";
import Book from "@/model/Book";
import {v4 as uuidv4} from "uuid";

export default class LocalBookRepository implements BookRepositoryInterface {
    public original: BookRepositoryInterface;
    private static instance: LocalBookRepository;
    private readonly localBooks: Array<Book> = [
        new Book(uuidv4(), "Skulduggery Pleasant 1", "Derek Landy", "Der Gentleman mit der Feuerhand", "Eine Kleinigkeit wie der Tod wird ihn nicht aufhalten! Er ist kein gewöhnlicher Detektiv. Er ist Zauberer und Meister der kleinen schmutzigen Tricks, und wenn die Umstände es erfordern, nimmt er es mit dem Gesetz nicht so genau. Er ist ein echter Gentleman. Und ... er ist ein Skelett. Als Stephanie Skulduggery Pleasant das erste Mal sieht, ahnt sie noch nicht, dass sie ausgerechnet mit ihm eines ihrer größten Abenteuer erleben wird. Denn um den mysteriösen Tod ihres Onkels aufzuklären, muss sie Skulduggery in eine Welt voller Magie begleiten", false, null, 2007, "", 352),
        new Book(uuidv4(), "Skulduggery Pleasant 2", "Derek Landy", "Das Groteskerium kehrt zurück", "Nein, ein normales Leben führt die 13-jährige Stephanie Edgley nicht. Während ihre Freundinnen sich zu Pyjamapartys treffen, verbringt sie ihre Zeit mit einem lebendigen Skelett. Um die Welt zu retten, versteht sich. Denn Stephanie und Skulduggery Pleasant stehen erneut vor einem knochenharten Fall: Baron Vengeous, einer der gefährlichsten Gegenspieler Skulduggerys, ist aus dem Gefängnis geflohen. Er hat einst ein Wesen geschaffen, das die Macht besitzt, die Gesichtslosen zurückzuholen. Nun will der Baron jenes Wesen erwecken - und somit den Weg für das Böse ebnen …", false, null, 2008, "", 336),
        new Book(uuidv4(), "Skulduggery Pleasant 3", "Derek Landy", "Die Diablerie bittet zum Sterben", "Ein Teleporter nach dem anderen wird umgebracht. Wer steckt dahinter? Und was bezwecken der oder die Mörder?Gut, dass Stephanie ihr Spiegelbild hat, das für sie in die Schule geht und die Hausaufgaben macht. Denn wer kann sich schon vormittags auf Geometrie konzentrieren, wenn er nachmittags noch eine Mordserie aufklären muss?In ihrem neuesten Fall müssen Skulduggery und Stephanie einen jungen Teleporter namens Fletcher Renn beschützen. Dumm nur, dass der sich als größte Nervensäge auf Erden entpuppt – und dass ihnen nicht nur die Diablerie im Nacken sitzt, sondern auch Remus Crux, der tollpatschigste Detektiv, den die Welt je gesehen hat. Der glaubt doch allen Ernstes, Skulduggery selbst sei der Teleporter-Mörder!", false, null, 2009, "", 352),
        new Book(uuidv4(), "Skulduggery Pleasant 4", "Derek Landy", "Sabotage im Sanktuarium", "Seit der großen Schlacht ist Skulduggery in der Welt der Gesichtslosen verschwunden. Nur ein Wunder kann ihn jetzt noch retten – oder Walküre: Sie muss ganz schnell seinen Kopf finden, der ihm einst von drei Kobolden in Irland gestohlen wurde. Während Walküre um die halbe Welt reist, wird der Magier Skarabäus nach 200 Jahren Gefängnis entlassen. Zwar hat er seine Zauberkräfte eingebüßt, doch seine Rachelust ist ungebrochen. Sofort schart er einen Kreis der schlimmsten Übeltäter um sich, unter ihnen auch Remus Crux, der die Seiten gewechselt hat. Sie alle können Skulduggerys Rückkehr kaum erwarten – denn jeder Einzelne von ihnen hat noch eine Rechnung mit ihm offen ...", false, null, 2010, "", 384),
        new Book(uuidv4(), "Skulduggery Pleasant 5", "Derek Landy", "Rebellion der Restanten", "Hilfe, die Restanten sind los! Durch einen dummen Zufall konnte der Restant der Totenbeschwörer fliehen und seine Brüder und Schwestern im Hotel Mitternacht befreien. Nun nimmt die teuflische Truppe Kurs auf Dublin, wo ihre „Retterin“ weilt: Darquise, die mächtige Zauberin, die die Welt vernichten soll. Alle Magier fürchten sie, aber niemand weiß, wer sie ist. Niemand außer Walküre – denn sie ist Darquise! Da Walküre jedoch Besseres zu tun hat, als die Welt in Schutt und Asche zu legen, will sie ihr schreckliches Schicksal ändern. Allein. Nicht einmal Skulduggery weiht sie ein. Doch wer allein kämpft, droht auch, allein zu sterben.", false, null, 2011, "", 512),
        new Book(uuidv4(), "Skulduggery Pleasant 6", "Derek Landy", "Passage der Totenbeschwörer", "Wieder einmal müssen Skulduggery und Walküre die Menschheit retten. Oder besser: die Hälfte der Menschheit. Denn die Totenbeschwörer haben endlich ihren Todbringer gefunden, der ihnen allen das ewige Leben bescheren soll. Doch für diesen besonderen Zauber braucht der Todbringer sehr viel Energie. Magische Energie, die er nur durch den Tod von – sagen wir – 3,5 Milliarden Menschen gewinnen kann. Ganz klar, dass Skulduggery und Walküre sofort zur Stelle sind, um das zu verhindern. Aber da bekommen sie Gegenwind von ganz unerwarteten Seite ...", false, null, 2012, "", 576),
        new Book(uuidv4(), "Skulduggery Pleasant 7", "Derek Landy", "Duell der Dimensionen", "Warum haben ganz normale Sterbliche plötzlich magische Fähigkeiten? Die wenigsten können damit umgehen. Wie zum Beispiel Jerry, der sich für einen Schmetterling hält. Ausgerechnet Walküre muss ihn ständig aus der Luft holen und das nervt. Schließlich wurde sie zur Weltenretterin ausgebildet und nicht zum Babysitter für durchgeknallte Sterbliche. Aber einige dieser Neu-Magier entwickeln so starke Kräfte, dass sie eine blutige Spur der Verwüstung durch das ganze Land ziehen. Nur ein sehr mächtiger Zauberer kann ihnen diese unglaubliche Macht gegeben haben. Einer, der seinen wahren Namen kennt. So wie Walküre selbst. Und er muss unbedingt gestoppt werden!", false, null, 2013, "", 592),
        new Book(uuidv4(), "Skulduggery Pleasant 8", "Derek Landy", "Die Rückkehr der Toten Männer", "Es herrscht Krieg! Doch diesmal stellen sich die Sanktuarien der Welt gegen das irische Sanktuarium. Denn Irland ist eine Wiege der Magie und das weckt Begehrlichkeiten. Und so kämpfen nun Zauberer gegen Zauberer in einem sinnlosen Bruderkrieg, während im Verborgenen Hexen und Warlocks nur darauf warten, die Zauberergemeinschaft an ihrer verwundbarsten Stelle zu treffen. Aber Irland hat eine Geheimwaffe – die Toten Männer. Jene unerschrockene Truppe von Helden um Skulduggery Pleasant, die schon gegen Mevolent gekämpft haben. Und mitten unter ihnen ein neues Mitglied: Walküre Unruh, Skulduggerys erwachsen gewordene Gefährtin. Niemand ahnt, dass Walküre selbst die größte Zerstörung bringen wird ...", false, null, 2014, "", 704),
        new Book(uuidv4(), "Skulduggery Pleasant 9", "Derek Landy", "Das Sterben des Lichts", "Der Krieg der Sanktuarien ist beendet. Die Kinder der Spinne sind besiegt und die Gefahren durch Warlocks, Restanten und Totenbeschwörer sind vorerst eingedämmt. Doch der Kreis der Freunde um Skulduggery Pleasant ist kleiner geworden, und Walküre Unruh ist verschwunden. An ihrer Stelle kämpft nun Walküres Spiegelbild an Skulduggerys Seite. Aber es hat etwas entwickelt, das ein Spiegelbild niemals verspüren darf: Gefühle. Und es erhebt den Anspruch, die echte Stephanie zu sein.Derweil steht die ganze Zaubererwelt unter Spannung, denn es ist nur noch eine Frage der Zeit, wann Darquise zurückkehrt. Die mächtigste und schrecklichste Zauberin aller Zeiten, die mit der Welt spielt wie ein Kind, das sein liebstes Spielzeug zerstört und dann achtlos wegwirft. Nur wenige wissen, wer sie wirklich ist. Denn in Darquise steckt niemand anderes als Walküre ...", false, null, 2015, "", 720),
        new Book(uuidv4(), "Odessa", "Peter van Olmen", "und die geheime Welt der Bücher", "Durch ein geheimnisvolles Portal gelangt die zwölfjährige Odessa in die Dichterstadt Scribopolis, in der nur berühmte Schriftsteller leben. Odessa hofft, hier ihren geliebten Vater zu finden. Doch stattdessen gerät sie in ein unglaubliches Abenteuer, in dessen Mittelpunkt das magische Buchus steht, das sie zufällig entdeckt hat. Was in ihm geschrieben steht, wird tatsächlich geschehen. Mabarak, ein finsterer Schriftsteller, und seine Verbündeten setzen alles daran, in den Besitz des Buchus zu gelangen. Odessa scheint ihren Vater nur finden zu können, wenn sie in das Herz der Verschwörung vorstößt …", false, null, 2009, "", 539)
    ];

    private constructor(original: BookRepositoryInterface) {
        this.original = original;
        LocalBookRepository.instance = this;
    }

    public static getInstance(original: BookRepositoryInterface): LocalBookRepository {
        return LocalBookRepository.instance ?? new LocalBookRepository(original);
    }

    async search(term: string): Promise<Array<Book>> {
        if (term.length < 3) {
            return [];
        }

        const matchingBooks: Book[] = [];

        this.localBooks
            .filter(book => book.title.toLowerCase().includes(term.toLowerCase()))
            .forEach(book => matchingBooks.push(book));

        const originalSearch = await this.original.search(term);

        return new Promise<Array<Book>>((resolve => resolve(matchingBooks.concat(originalSearch))));
    }
}

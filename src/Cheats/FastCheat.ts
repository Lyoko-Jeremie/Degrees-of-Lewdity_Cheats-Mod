import {Skill} from "./Skill";
import {Relation} from "./Relation";
import {State} from "./State";
import {NpcRelation} from "./NpcRelation";
import {PlayerState} from "./PlayerState";

export class FastCheat {
    constructor(
        public skill: Skill,
        public relation: Relation,
        public state: State,
        public npcRelation: NpcRelation,
        public playerState: PlayerState,
    ) {
    }

    public fullState() {
        [
            'seductionskill',
            'oralskill',
            'chestskill',
            'handskill',
            'bottomskill',
            'analskill',
            'vaginalskill',
            'feetskill',
            'thighskill',
            'penileskill',
        ].map(T => this.skill.table?.get(T)).forEach(T => {
            if (T) {
                this.skill.set(T.key, T.max);
            }
        });
        [
            'skulduggery',
            'danceskill',
            'swimmingskill',
            'athletics',
            'tending',
            'housekeeping',
        ].map(T => this.skill.table?.get(T)).forEach(T => {
            if (T) {
                this.skill.set(T.key, T.max);
            }
        });
        [
            'science',
            'sciencetrait',
            'maths',
            'mathstrait',
            'english',
            'englishtrait',
            'history',
            'historytrait',
        ].map(T => this.skill.table?.get(T)).forEach(T => {
            if (T) {
                this.skill.set(T.key, T.max);
            }
        });
        [
            'prof.spray',
            'prof.net',
        ].map(T => this.skill.table?.get(T)).forEach(T => {
            if (T) {
                this.skill.set(T.key, T.max);
            }
        });
        [
            'fame.scrap',
            'fame.good',
            'fame.business',
            'fame.social',
        ].map(T => this.relation.table?.get(T)).forEach(T => {
            if (T) {
                this.relation.set(T.key, T.max);
            }
        });
        [
            'purity',
            'beauty',
            'physique',
            'willpower',
            'awareness',
            'promiscuity',
            'exhibitionism',
            'deviancy',
        ].map(T => this.state.table?.get(T)).forEach(T => {
            if (T) {
                this.state.set(T.key, T.max);
            }
        });
        [
            'condoms',
        ].map(T => this.state.table?.get(T)).forEach(T => {
            if (T) {
                this.state.set(T.key, T.max);
            }
        });

    }

    resetState() {
        [
            'pain',
            'arousal',
            'tiredness',
            'stress',
            'trauma',
            // 'control',
            // 'allure',
            'drunk',
            'drugged',
            'hallucinogen',
        ].map(T => this.state.table?.get(T)).forEach(T => {
            if (T) {
                this.state.set(T.key, T.min);
            }
        });
        [
            'control',
        ].map(T => this.state.table?.get(T)).forEach(T => {
            if (T) {
                this.state.set(T.key, T.max);
            }
        });
    }

    playerStateFull() {
        [
            'player.breastsize',
            'milk_volume',
        ].map(T => this.playerState.table?.get(T)).forEach(T => {
            if (T) {
                this.playerState.set(T.key, T.max);
            }
        });
        if (this.playerState.get('player.penisExist')) {
            [
                'player.penissize',
                'semen_volume',
            ].map(T => this.playerState.table?.get(T)).forEach(T => {
                if (T) {
                    this.playerState.set(T.key, T.max);
                }
            });
        }
        [
            'player.bottomsize',
            'bottomgrowthtimer',
        ].map(T => this.playerState.table?.get(T)).forEach(T => {
            if (T) {
                this.playerState.set(T.key, T.max);
            }
        });
    }

    noCrime() {
        [
            'crimehistory',
            'crime',
        ].map(T => this.state.table?.get(T)).forEach(T => {
            if (T) {
                this.state.set(T.key, T.min);
            }
        });
    }

    fullSpray() {
        [
            'spray',
            'spraymax',
        ].map(T => this.state.table?.get(T)).forEach(T => {
            if (T) {
                this.state.set(T.key, T.max);
            }
        });
    }

}

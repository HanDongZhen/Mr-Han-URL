import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('responsive portfolio, bilingual content, navigation and all project details',async({page},testInfo)=>{
 const errors:string[]=[]; page.on('pageerror',error=>errors.push(error.message));
 await page.goto('/'); await expect(page.getByRole('heading',{name:'Mr Han.',exact:true})).toBeVisible();
 await expect(page.locator('html')).toHaveAttribute('lang','en');
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:`qa/${testInfo.project.name}-hero.png`});
 await page.getByRole('button',{name:'Switch to Chinese'}).click();
 await expect(page.getByRole('heading',{name:'思考 · 构建 · 探索'})).toBeVisible();
 await expect(page.locator('html')).toHaveAttribute('lang','zh-CN');
 await page.reload();await expect(page.getByRole('heading',{name:'思考 · 构建 · 探索'})).toBeVisible();
 await page.getByRole('button',{name:'切换到英文'}).click();
 await page.getByRole('navigation').getByRole('link',{name:'Selected work'}).click();
 await expect(page).toHaveURL(/#work/);
 await page.getByRole('button',{name:'Explore the concept',exact:true}).click();
 await expect(page.getByRole('dialog')).toBeVisible();
 const range=page.getByRole('slider');await range.fill('95');await expect(page.locator('output')).toHaveText('95 km/h');
 await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();
 for(const name of ['Nova QR','ConvertX','Aether','Pulse UI','Orbit Lab']){await page.getByRole('button',{name:`Explore the concept — ${name}`}).click();await expect(page.getByRole('dialog').getByRole('heading',{name,exact:true})).toBeVisible();await page.getByRole('button',{name:'Close',exact:true}).click();}
 await page.getByRole('tab',{name:/HarmonyOS/}).click();await expect(page.getByRole('tabpanel')).toContainText('new platform');
 await page.getByRole('navigation').getByRole('link',{name:'The lab'}).click();await page.getByRole('button',{name:/EXP—001/}).click();await page.getByRole('slider').fill('90');await expect(page.locator('output')).toHaveText('90%');await page.keyboard.press('Escape');
 await page.getByRole('button',{name:/EXP—002/}).click();await page.getByRole('slider').fill('80');await expect(page.locator('output')).toHaveText('80%');await page.keyboard.press('Escape');
 await expect(page.getByRole('link',{name:'Find me on GitHub'})).toHaveAttribute('href','https://github.com/HanDongZhen');
 await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}scrollTo(0,0);});
 await page.screenshot({path:`qa/${testInfo.project.name}-full.png`,fullPage:true});
 expect(errors).toEqual([]);
});
test('reduced motion, keyboard focus and accessibility',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 await expect(page.locator('html')).toHaveAttribute('data-motion','off');await expect(page.locator('.light-field canvas')).toHaveCount(0);
 await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();
 const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(results.violations).toEqual([]);
 await page.getByRole('button',{name:'Explore the concept',exact:true}).click();
 const modalResults=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(modalResults.violations).toEqual([]);
 await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Explore the concept',exact:true})).toBeFocused();
});

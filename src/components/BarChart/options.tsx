import {Tooltip} from 'chart.js';

declare module 'chart.js' {
  interface TooltipPositionerMap {
    tooltipPositioner: TooltipPositionerFunction<ChartType>;
  }
}

Tooltip.positioners.tooltipPositioner = (elements, eventPosition) => {
  return {x: eventPosition.x+20, y: eventPosition.y-50};
};

const dateFormat = 'DD MMMM YYYY';

export const getOptions = (data: any) => ({
  responsive: true,
  grouped: false,
  scales: {
    x: {display: false},
    y: {display: false}
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
      position: 'tooltipPositioner',
      interaction: {
        mode: 'index'
      },
      callbacks: {
        beforeLabel: (context: {dataset: {label: string}; datasetIndex: number, dataIndex: number}) => {
          return data[context.datasetIndex][context.dataIndex].date.format(dateFormat);
        },
        label: (context: {parsed: {y: number}}) => {
          return `${context.parsed.y}₽`;
        }
      },
      external: (context: { tooltip: any; chart: { canvas: { getBoundingClientRect: () => any; }; }; }) => {
        let tooltipEl = document.getElementById('chartjs-tooltip');

        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
           tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = '<table></table>';
          document.body.appendChild(tooltipEl);
        }
        const tooltipModel = context.tooltip;
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = '0';
          return;
        }

        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }

        const getBody = (bodyItem: {lines: string, before: string}) => ({
          before: bodyItem.before,
          lines: bodyItem.lines
        })
        
        if (tooltipModel.body) {
          const bodyLines = tooltipModel.body.map(getBody);

            let innerHtml = '<table>';

          bodyLines.forEach((body: {lines: string, before: string}, i: number)  => {
            const colors = tooltipModel.labelColors[i];
            const styleDate = `
              color: ${colors.backgroundColor}; 
              font-size: 12px
            `;
            innerHtml += `<tr><td style="${styleDate}">${body.before}</td></tr>`;
            innerHtml += `<tr><td>${body.lines}</td></tr>`;
          });
          innerHtml += '</table>';

          let tableRoot = tooltipEl.querySelector('table');
            
          if(tableRoot) {
            tableRoot.innerHTML = innerHtml;
          }
        }

        const position = context.chart.canvas.getBoundingClientRect();

        tooltipEl.style.opacity = '1';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
        tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
        tooltipEl.style.pointerEvents = 'none';
      }
    }
  }
});
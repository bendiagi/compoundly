import React from 'react';
import { ProjectionPoint } from '@/lib/calculateCompoundReturns';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { Button } from '@/components/ui/button';

interface Props {
  data: ProjectionPoint[] | null;
}

const ExportButtons: React.FC<Props> = ({ data }) => {
  const handleExportPNG = async () => {
    const chart = document.getElementById('investment-chart');
    if (!chart) return;
    const canvas = await html2canvas(chart);
    canvas.toBlob(blob => {
      if (blob) saveAs(blob, 'compoundly-chart.png');
    });
  };

  const handleExportCSV = () => {
    if (!data) return;
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'compoundly-data.csv');
  };

  return (
    <div className="flex gap-4 justify-end mt-2">
      <Button type="button" onClick={handleExportPNG} disabled={!data} className="bg-[#BDE681] hover:bg-[#BDE681]/90 text-[#222821] font-medium rounded-lg px-4 py-2 transition-colors duration-200">
        Download PNG
      </Button>
      <Button type="button" variant="secondary" onClick={handleExportCSV} disabled={!data} className="bg-[#222821] text-white font-medium rounded-lg px-4 py-2 transition-colors duration-200 border border-[#33532A]">
        Download CSV
      </Button>
    </div>
  );
};

export default ExportButtons; 